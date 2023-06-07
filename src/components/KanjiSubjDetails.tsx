import { IonCol, IonRow, IonSkeletonText } from "@ionic/react";

import { SubjInfoContainer } from "./SubjectDetailsStyled";
import { Subject } from "../types/Subject";
import { TxtWithSubjTags } from "./TxtWithSubjTags";
import { SubjectCardList } from "./SubjectCardList";
import {
  SubjDetailSubHeading,
  SubjDetailTxt,
  SubjDetailSection,
} from "./SubjectDetailsStyled";

import { useSubjectsByIDs } from "../hooks/useSubjectsByIDs";
import { useAssignmentsBySubjIDs } from "../hooks/useAssignmentsBySubjIDs";

type Props = {
  subject: Subject;
};

export const KanjiSubjDetails = ({ subject }: Props) => {
  let similarSubjIDs = subject.visually_similar_subject_ids
    ? subject.visually_similar_subject_ids
    : [];

  const {
    isLoading: radicalsUsedSubjLoading,
    data: radicalsUsedSubjData,
    error: radicalsUsedSubjErr,
  } = useSubjectsByIDs(subject.component_subject_ids!);

  const {
    isLoading: radicalsUsedAssignmentsLoading,
    data: radicalsUsedAssignmentsData,
    error: radicalsUsedAssignmentsErr,
  } = useAssignmentsBySubjIDs(subject.component_subject_ids!);

  const {
    isLoading: similarKanjiSubjLoading,
    data: similarKanjiSubjData,
    error: similarKanjiSubjErr,
  } = useSubjectsByIDs(similarSubjIDs);

  const {
    isLoading: similarKanjiAssignmentsLoading,
    data: similarKanjiAssignmentsData,
    error: similarKanjiAssignmentsErr,
  } = useAssignmentsBySubjIDs(similarSubjIDs);

  let radicalsUsedLoading =
    radicalsUsedSubjLoading ||
    radicalsUsedSubjErr ||
    radicalsUsedAssignmentsLoading ||
    radicalsUsedAssignmentsErr ||
    similarKanjiSubjLoading ||
    similarKanjiSubjErr ||
    similarKanjiAssignmentsLoading ||
    similarKanjiAssignmentsErr;

  // TODO: make this laoding skeleton actually good lol
  if (radicalsUsedLoading) {
    return (
      <IonRow class="ion-justify-content-start">
        <div className="ion-padding">
          <IonSkeletonText animated={true}></IonSkeletonText>
          <IonSkeletonText animated={true}></IonSkeletonText>
        </div>
      </IonRow>
    );
  }

  return (
    <SubjInfoContainer>
      <SubjDetailSection>
        <SubjDetailSubHeading>Radical Combination</SubjDetailSubHeading>
        <SubjectCardList
          subjList={radicalsUsedSubjData}
          assignmentList={radicalsUsedAssignmentsData}
        />
      </SubjDetailSection>
      <SubjDetailSection>
        <SubjDetailSubHeading>Meaning Mnemonic</SubjDetailSubHeading>
        <TxtWithSubjTags mnemonic={subject.meaning_mnemonic} />
      </SubjDetailSection>
      <SubjDetailSection>
        <SubjDetailSubHeading>Reading Mnemonic</SubjDetailSubHeading>
        <TxtWithSubjTags mnemonic={subject.reading_mnemonic!} />
      </SubjDetailSection>
      <SubjDetailSection>
        <SubjDetailSubHeading>Visually Similar Kanji</SubjDetailSubHeading>
        <SubjectCardList
          subjList={similarKanjiSubjData}
          assignmentList={similarKanjiAssignmentsData}
        />
      </SubjDetailSection>
      <SubjDetailSection>
        <SubjDetailSubHeading>Found in Vocabulary</SubjDetailSubHeading>
        <SubjDetailTxt>...</SubjDetailTxt>
      </SubjDetailSection>
    </SubjInfoContainer>
  );
};
