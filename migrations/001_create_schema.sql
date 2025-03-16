-- Users Table (Stores authentication & profile data)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    profile_picture TEXT,
    created_at TIMESTAMP DEFAULT now(),
    admin INT DEFAULT 0
);

-- Schools Table (Stores university/school names)
CREATE TABLE schools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL
);

-- Courses Table (Stores courses offered by schools)
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID NOT NULL,
    course_code TEXT NOT NULL,
    course_name TEXT NOT NULL,
    UNIQUE (school_id, course_code),  -- Ensures course codes are unique within a school
    FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE
);

-- Saved Courses Table (Users can save courses for quick access)
CREATE TABLE saved_courses (
    user_id UUID NOT NULL,
    course_id UUID NOT NULL,
    PRIMARY KEY (user_id, course_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Posts Table (Stores text-based, file-based, or mixed posts linked to courses)
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    course_id UUID NOT NULL,  -- Each post belongs to a course
    title TEXT NOT NULL,
    content TEXT,  -- Used for text-based posts
    file_url TEXT,  -- Used for file-based posts (points to S3 or another storage)
    post_type TEXT CHECK (post_type IN ('text', 'file', 'both')),
    upvote_count INT DEFAULT 0,  -- Stores the number of upvotes
    created_at TIMESTAMP DEFAULT now(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Comments Table (Stores comments on posts)
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    post_id UUID NOT NULL,
    parent_comment_id UUID,  -- For nested comments
    comment_text TEXT NOT NULL,
    upvote_count INT DEFAULT 0,  -- Stores the number of upvotes
    created_at TIMESTAMP DEFAULT now(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_comment_id) REFERENCES comments(id) ON DELETE CASCADE
);

-- Post Upvotes Table (Tracks post upvotes)
CREATE TABLE post_upvotes (
    user_id UUID NOT NULL,
    post_id UUID NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    PRIMARY KEY (user_id, post_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

-- Comment Upvotes Table (Tracks comment upvotes)
CREATE TABLE comment_upvotes (
    user_id UUID NOT NULL,
    comment_id UUID NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    PRIMARY KEY (user_id, comment_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE
);
