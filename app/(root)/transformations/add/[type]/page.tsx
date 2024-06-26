import { getUserById } from "@/actions/user.actions";
import { Header } from "@/components/shared/Header";
import { InsufficientCreditsModal } from "@/components/shared/InsufficientCreditsModal";
import { TransformationForm } from "@/components/shared/TransformationForm";
import { creditFee, transformationTypes } from "@/constants";
import { getSession } from "@/services/getSession";
import { redirect } from "next/navigation";

type TransformationParams = {
  params: { type: string };
};

export default async function AddTransformationPage({
  params: { type },
}: TransformationParams) {
  const session = await getSession();
  const user = await getUserById(session?.user.id ?? "");

  if (!session || !user) {
    redirect("/login");
  }

  const {
    type: transformationType,
    subtitle,
    title,
    icon,
  } = transformationTypes[type as keyof typeof transformationTypes];

  return (
    <main className="flex flex-col gap-y-8">
      <Header title={title} subtitle={subtitle} />

      {user &&
        user.creditBalance !== null &&
        user.creditBalance < Math.abs(creditFee) && (
          <InsufficientCreditsModal />
        )}

      <TransformationForm
        action="add"
        userId={user.id}
        type={transformationType as TransformationTypeKey}
        creditBalance={user.creditBalance ?? 0}
      />
    </main>
  );
}
