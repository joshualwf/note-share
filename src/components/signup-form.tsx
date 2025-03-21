import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "./ui/card";

interface SignupFormProps {
  heading?: string;
  subheading?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
  };
  signupText?: string;
  googleText?: string;
  loginText?: string;
  loginUrl?: string;
}

const SignupForm = ({
  heading = "Sign up",
  subheading = "Welcome to NoteShare!",
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "https://shadcnblocks.com/images/block/block-1.svg",
    alt: "logo",
  },
  googleText = "Sign up with Google",
  signupText = "Create an account",
  loginText = "Already have an account?",
  loginUrl = "/login",
}: SignupFormProps) => {
  return (
    <section className="pt-10 pb-32">
      <div className="container">
        <div className="flex flex-col gap-4">
          {/* <div className="mx-auto w-full max-w-sm rounded-md p-6 shadow"> */}
          <Card className="mx-auto w-full max-w-sm p-6">
            <div className="mb-6 flex flex-col items-center">
              {/* <a href={logo.url}>
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="mb-7 h-10 w-auto"
                />
              </a> */}
              <p className="mb-2 text-2xl font-bold">{heading}</p>
              <p className="text-muted-foreground">{subheading}</p>
            </div>
            <div>
              <div className="grid gap-4">
                <Input type="email" placeholder="Enter your email" required />
                <div>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <Button type="submit" className="mt-2 w-full">
                  {signupText}
                </Button>
                <Button variant="outline" className="w-full">
                  <FcGoogle className="mr-2 size-5" />
                  {googleText}
                </Button>
              </div>
              <div className="mx-auto mt-8 flex justify-center gap-1 text-sm text-muted-foreground">
                <p>{loginText}</p>
                <a href={loginUrl} className="font-medium text-primary">
                  Login
                </a>
              </div>
            </div>
          </Card>
          {/* </div> */}
        </div>
      </div>
    </section>
  );
};

export { SignupForm };
