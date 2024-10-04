import { useSelector } from "react-redux";
import MenuCardBox from "./cards/MenuCardBox";
import PageTitle from "./blocks/PageTitle";

const Shedule = () => {
  const titleCardId = 7;

  return (
    <main>
      <PageTitle titleCardId={titleCardId} />
      <MenuCardBox titleCardId={titleCardId} />
    </main>
  );
};

export default Shedule;
