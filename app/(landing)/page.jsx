import { Button } from "../../components/ui/button";
import Link from "next/link";
const LandingPage = () => {
  return (
    <div>
      <div>Landing Page</div>
      <div>
        <Link href="/sign-in">
          <Button>SignIn</Button>
        </Link>
      </div>
      <div>
        <Link href="/sign-up">
          <Button>SignUp</Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
