import { IonSkeletonText } from "@ionic/react";

import { getSubjectDisplayName } from "../services/SubjectAndAssignmentService";

import { Subject } from "../types/Subject";
import { SubjectChars } from "./SubjectChars";

import styled from "styled-components/macro";

const SubjectName = styled.h1`
  margin: 0;
  word-break: break-all;
`;

type Props = {
  subject: Subject;
};

export const SubjNameAndCharacter = ({ subject }: Props) => {
  // TODO: display loading skeletons
  return (
    <>
      <SubjectChars subject={subject} fontSize="2rem" withBgColor={true} />
      {subject && <SubjectName>{getSubjectDisplayName(subject)}</SubjectName>}
    </>
  );
};
