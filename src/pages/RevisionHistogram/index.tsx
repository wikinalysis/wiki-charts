import * as React from "react";
import { LanguageSelect } from "../../components/LanguageSelect";
import { TextLengthHistogram } from "./TextLengthHistogram";
import { RevisionCountHistogram } from "./RevisionCountHistogram";
import { LastEditedHistogram } from "./LastEditedHistogram";
import { Container, Row, Col } from "react-bootstrap";
import api from "../../api";

const RevisionHistogramPage = () => {
  const [language, setLanguage] = React.useState("");
  const [languages, setLanguages] = React.useState([] as any[]);
  React.useEffect(() => {
    api.getCurrentWikis({}).then(response => {
      const data = response.data.map((wiki: any) => ({
        ...wiki,
        value: wiki.id,
        label: `${wiki.language} (${wiki.languageLocal})`
      }));
      setLanguages(data);
    });
  }, []);
  return (
    <Container>
      <Row>
        <Col md={{ span: 4, offset: 4 }}>
          <LanguageSelect languages={languages} setLanguage={setLanguage} />
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
