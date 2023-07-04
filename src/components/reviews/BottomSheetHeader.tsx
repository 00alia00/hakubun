import { IonHeader } from "@ionic/react";
import { Subject, SubjectType } from "../../types/Subject";
import { getSubjectColor } from "../../services/SubjectAndAssignmentService";
import { SubjectChars } from "../SubjectChars";
import styled from "styled-components/macro";

type ContainerProps = {
  subjType: SubjectType;
};

const Container = styled(IonHeader)<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  --ion-toolbar-background: ${({ subjType }) => getSubjectColor(subjType)};
  --ion-background-color: ${({ subjType }) => getSubjectColor(subjType)};
  background-color: ${({ subjType }) => getSubjectColor(subjType)};
  border-radius: 0 0 20px 20px;

  &::after {
    background: none;
  }

  padding: 10px 0;
  transition: height 2s;
  box-shadow: none;
`;

type Props = {
  subject: Subject;
};

export const BottomSheetHeader = ({ subject }: Props) => {
  return (
    <Container subjType={subject.object}>
      <SubjectChars subject={subject} fontSize="4rem" withBgColor={true} />
    </Container>
  );
};