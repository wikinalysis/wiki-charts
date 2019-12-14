import * as React from "react";
import { LanguageSelect } from "../../components/LanguageSelect";
import { TextLengthHistogram } from "./TextLengthHistogram";
import { RevisionCountHistogram } from "./RevisionCountHistogram";
import { LastEditedHistogram } from "./LastEditedHistogram";
import { Container, Row, Col } from "react-bootstrap";

const CURRENT_LANGUAGES = [
  { value: "ltg", label: "Latgalian" },
  { value: "tn", label: "Setswana" }
];

const RevisionHistogramPage = () => {
  const [language, setLanguage] = React.useState("");
  return (
    <Container>
      <Row>
        <Col md={{ span: 4, offset: 4 }}>
          <LanguageSelect
            languages={CURRENT_LANGUAGES}
            setLanguage={setLanguage}
          />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <h4>Last Edited</h4>
          <LastEditedHistogram language={language} />
        </Col>
        <Col md={6}>
          <h4>Number of Revisions</h4>
          <RevisionCountHistogram language={language} />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <h4>Article Length</h4>
          <TextLengthHistogram language={language} />
        </Col>
      </Row>
    </Container>
  );
};

export default RevisionHistogramPage;
