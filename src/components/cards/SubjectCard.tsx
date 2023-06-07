import { useHistory } from "react-router";
import { IonRow, useIonPopover } from "@ionic/react";

import { RadicalButton } from "../buttons/RadicalButton";
import { KanjiButton } from "../buttons/KanjiButton";
import { SubjectCardLoading } from "../loading-skeletons/SubjectCardLoading";
import { SubjCardPopover } from "../SubjCardPopover";

import { Subject } from "../../types/Subject";
import { Assignment } from "../../types/Assignment";

// TODO: use a context around this or abstract things out, this many props is icky
type SubjProps = {
  subject: Subject;
  assignment: Assignment | undefined;
  locked: boolean;
  useLockedStyle: boolean;
  isButtonLink?: boolean;
  showDetails?: boolean;
};

// TODO: change name and move to buttons folder
export const SubjectCard = ({
  subject,
  assignment,
  locked,
  useLockedStyle,
  isButtonLink = false,
  showDetails = true,
}: SubjProps) => {
  const history = useHistory();
  const handleDismiss = () => dismiss();

  // TODO: use useHistory or useLocation to set state/type of subject
  const navigate = (route: string) => {
    handleDismiss();
    history.push(route);
  };

  const [present, dismiss] = useIonPopover(SubjCardPopover, {
    size: "cover",
    subject,
    assignment,
    navigate,
  });

  const onClickEvent = (e: any) => {
    if (isButtonLink) {
      navigate(`/subject/${subject.id}`);
    } else {
      present({
        event: e.nativeEvent,
        size: "auto",
        alignment: "center",
      });
    }
  };

  return (
    <IonRow className="ion-justify-content-center">
      {(subject && assignment) || (subject && locked) ? (
        subject.object === "radical" ? (
          <RadicalButton
            subject={subject}
            isBigBtn={isButtonLink}
            onBtnClick={onClickEvent}
            showDetails={showDetails}
          />
        ) : (
          <KanjiButton
            subject={subject}
            isBigBtn={isButtonLink}
            onBtnClick={onClickEvent}
            locked={useLockedStyle && locked}
            showDetails={showDetails}
          />
        )
      ) : (
        <SubjectCardLoading />
      )}
    </IonRow>
  );
};
