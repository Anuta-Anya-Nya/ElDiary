import { useState } from "react";
import moment from "moment/min/moment-with-locales.min";
import { useSelector } from "react-redux";
import MenuCardBox from "./cards/MenuCardBox";
import PageTitle from "./blocks/PageTitle";
import Loading from "./blocks/Loading";
import { findCurrentStudyYear } from "../utils/services";
import { MENU_CARDS } from "../utils/constants";
import StudyYear from "./blocks/StudyYear";
import QuartersTable from "./tables/QuartersTable";

function Quarters() {
  const [currentStudyYear, setCurrentYear] = useState(
    findCurrentStudyYear(moment())
  );
  const titleCardId = MENU_CARDS.GRADES_ID;
  const loadingQuaterts = useSelector((state) => state.quarters.loading);
  const quarters = useSelector((state) => state.quarters.quartersList);
  const isCreate = Object.keys(quarters).length > 0 ? true : false;
  const [editQuarters, setEditQuarters] = useState(false);
  const buttonText = "четверти";

  return (
    <main>
      <PageTitle titleCardId={titleCardId} />
      <section className="quarters">
        <div className="container homework-container">
          {loadingQuaterts ? (
            <Loading />
          ) : (
            <>
              <StudyYear
                currentStudyYear={currentStudyYear}
                setCurrentYear={setCurrentYear}
                editSchedule={editQuarters}
                setEditSchedule={setEditQuarters}
                isCreate={isCreate}
                text={buttonText}
              />

              <div className="homework__area">
                <QuartersTable quarters={quarters} />
              </div>
            </>
          )}
        </div>
      </section>
      <MenuCardBox titleCardId={titleCardId} classMenu={"buttons"} />
    </main>
  );
}

export default Quarters;
