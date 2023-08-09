import { IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import styled from "styled-components";

const Percentage = styled.h2`
  font-size: 2rem;
`;

const Header = styled(IonHeader)`
  --ion-toolbar-background: var(--ion-color-secondary);
  --ion-background-color: var(--ion-color-secondary);
  background-color: var(--ion-color-secondary);
  padding: 18px 0;
  text-align: center;
`;

const Title = styled(IonTitle)`
  text-align: center;
  font-size: 1.75rem;
`;

type Props = {
  numCorrect: number;
  numReviews: number;
};

// TODO: change to use custom header component
function ResultsHeader({ numCorrect, numReviews }: Props) {
  let percentageCorrect = Math.ceil(100 * (numCorrect / numReviews));

  return (
    <Header>
      <IonToolbar>
        <Title>Review Summary</Title>
        <Percentage>{percentageCorrect}%</Percentage>
        <p>Answered Correctly</p>
      </IonToolbar>
    </Header>
  );
}

export default ResultsHeader;
