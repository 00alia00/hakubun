import {
  SubjDetailSection,
  SubjDetailSubHeading,
} from "../subject-details/SubjectDetailsStyled";
import { TxtWithSubjTags } from "../TxtWithSubjTags";
import { Hint } from "../subject-details/Hint";
import { Vocabulary } from "../../types/Subject";

type Props = {
  vocab: Vocabulary;
};

export const VocabMeaningExplanation = ({ vocab }: Props) => {
  return (
    <SubjDetailSection>
      <SubjDetailSubHeading>Meaning Explanation</SubjDetailSubHeading>
      <TxtWithSubjTags textWithTags={vocab.meaning_mnemonic} />
      {vocab.reading_hint && <Hint hint={vocab.reading_hint} />}
    </SubjDetailSection>
  );
};