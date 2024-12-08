import dynamic from "next/dynamic";

const UserForm = dynamic(() => import("@/components/UserForm"), { ssr: false });

const NewUser = () => {
  return <UserForm />;
};

export default NewUser;
