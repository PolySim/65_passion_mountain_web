import { redirect } from "next/navigation";
import { UserService } from "@/service/UserService";

const ValidUser = async () => {
  if (!(await UserService.isLoggedIn())) {
    redirect("/api/auth/login");
  }

  return <></>;
};

export default ValidUser;
