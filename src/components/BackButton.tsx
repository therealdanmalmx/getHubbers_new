import { useTranslation } from "react-i18next";
import { LuArrowLeft } from "react-icons/lu";
import { useNavigate } from "react-router";

interface Props {
  route: string;
  routeName: string;
}
const BackButton = ({ route, routeName }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/${route}`)}
      className="my-4 flex w-fit cursor-pointer items-center justify-start gap-2 rounded-full bg-nordic_asccent py-1 pr-2 duration-300 ease-in-out hover:bg-slate-700 md:my-0 md:ml-2"
    >
      <LuArrowLeft className="size-6 cursor-pointer rounded text-nordic_salmon duration-300 ease-in-out" />
      <span className="text-white">
        {t("backTo")} {routeName}
      </span>
    </div>
  );
};

export default BackButton;
