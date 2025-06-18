
import { Card, CardContent } from "@/components/ui/card";

interface UserInfoProps {
  userEmail: string | undefined;
}

const UserInfo = ({ userEmail }: UserInfoProps) => {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-4 text-center">
        <p className="text-sm text-gray-400">
          💜 Signed in as: {userEmail}
        </p>
      </CardContent>
    </Card>
  );
};

export default UserInfo;
