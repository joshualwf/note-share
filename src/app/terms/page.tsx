import { Card } from "@/components/ui/card";
import React from "react";
import Image from "next/image";

function page() {
  return (
    <div className="flex min-h-svh w-full justify-center p-6 md:p-10">
      <div className="w-full">
        <section className="pt-10 pb-32 w-full">
          <div className="flex flex-col gap-4 w-full items-center">
            <Card className="mx-auto p-6">
              <div className="mb-6 flex flex-col items-center text-center">
                <Image
                  src="/icon9.png"
                  width="60"
                  height="60"
                  alt="standing nerd"
                />
                <p className="mb-2 text-2xl font-bold">Terms & Conditions</p>
                <p className="text-muted-foreground text-start">
                  Welcome to NoteShare! This platform is a side project
                  developed to help students share academic materials more
                  easily. We are not a company, nor a formal educational
                  institution.
                  <br />
                  <br />
                  By using the platform, you agree to the following Terms and
                  Conditions:
                  <br />
                  <br />
                  1. Disclaimer of Liability <br />
                  This platform is provided "as-is" with no guarantees of
                  reliability, accuracy, uptime, or legality of content.
                  <br />
                  We are not liable for any damages, losses, or consequences
                  resulting from your use of the platform. You use the platform
                  at your own risk. This is a side project run in good faith to
                  help students. We do not moderate or verify uploaded content.{" "}
                  <br />
                  <br />
                  2. User Responsibilities <br />
                  You agree: To only upload content you have the right to share.
                  Not to post any content that infringes copyright, violates
                  privacy laws, or breaks any applicable laws. To keep your
                  login credentials secure.
                  <br />
                  <br />
                  3. Content Ownership & Licensing <br />
                  You retain ownership of all materials you upload. By
                  uploading, you grant us a non-exclusive, royalty-free license
                  to store and display the materials on this platform for
                  academic sharing purposes.
                  <br />
                  <br />
                  4. Prohibited Use <br />
                  You must not: Upload copyrighted materials without permission
                  Share offensive, illegal, or misleading content Attempt to
                  exploit, disrupt, or attack the platform
                  <br />
                  <br />
                  5. Intellectual Property & Takedown Policy <br />
                  If you believe your copyrighted material is being shared
                  unlawfully, contact us at{" "}
                  <a
                    href="mailto:notesharets@gmail.com"
                    className="text-primary underline"
                  >
                    notesharets@gmail.com
                  </a>{" "}
                  with the relevant details. We will respond appropriately,
                  including removing the content if necessary.
                  <br />
                  <br />
                  6. Changes and Termination <br />
                  We reserve the right to: Update these Terms from time to time
                  Remove content at our discretion Suspend or terminate accounts
                  that violate these Terms
                  <br />
                  <br />
                  7. Final Notes
                  <br />
                  This is a community-based platform, run by students for
                  students. We are not responsible for how others use or
                  interpret the materials here. By signing up and using the
                  platform, you agree to these Terms & Conditions.
                </p>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}

export default page;
