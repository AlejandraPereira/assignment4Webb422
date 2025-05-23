import { useRouter } from "next/router";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function AdvancedSearch() {
    const { register, handleSubmit,formState: { errors }  } = useForm();
    const router = useRouter();

    const submitForm = (data) => {
        let queryString = `searchBy=${encodeURIComponent(data.searchBy)}`;

        if (data.geoLocation) {
            queryString += `&geoLocation=${encodeURIComponent(data.geoLocation)}`;
        }

        if (data.medium) {
            queryString += `&medium=${encodeURIComponent(data.medium)}`;
        }

        queryString += `&isOnView=${data.isOnView ? "true" : "false"}`;
        queryString += `&isHighlight=${data.isHighlight ? "true" : "false"}`;
        queryString += `&q=${encodeURIComponent(data.q)}`;

        router.push(`/artwork?${queryString}`);
    };

    return(
        <Form onSubmit={handleSubmit(submitForm)}>
            <Row>
                <Col>
                <Form.Group className="mb-3">
                    <Form.Label>Search Query</Form.Label>
                    <Form.Control  type="text" 
                            placeholder="Enter search query"
                            {...register("q", { required: "Search query is required" })} 
                            className={errors.q ? "is-invalid" : ""}
                        />
                </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                <Form.Label>Search By</Form.Label>
                <Form.Select name="searchBy" className="mb-3">
                    <option value="title">Title</option>
                    <option value="tags">Tags</option>
                    <option value="artistOrCulture">Artist or Culture</option>
                </Form.Select>
                </Col>
                <Col md={4}>
                <Form.Group className="mb-3">
                    <Form.Label>Geo Location</Form.Label>
                    <Form.Control type="text" placeholder="" name="geoLocation" />
                    <Form.Text className="text-muted">
                    Case Sensitive String (ie &quot;Europe&quot;, &quot;France&quot;, &quot;Paris&quot;, &quot;China&quot;, &quot;New York&quot;, etc.), with multiple values separated by the | operator
                </Form.Text>
                </Form.Group>
                </Col>
                <Col md={4}>
                <Form.Group className="mb-3">
                    <Form.Label>Medium</Form.Label>
                    <Form.Control type="text" placeholder="" name="medium"/>
                    <Form.Text className="text-muted">
                    Case Sensitive String (ie: &quot;Ceramics&quot;, &quot;Furniture&quot;, &quot;Paintings&quot;, &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with multiple values separated by the | operator
                </Form.Text>
                </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                <Form.Check
                    type="checkbox"
                    label="Highlighted"
                    name="isHighlight"
                />
                <Form.Check
                    type="checkbox"
                    label="Currently on View"
                    name="isOnView"
                />
                </Col>
            </Row>
            <Row>
                <Col>
                <br />
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                </Col>
            </Row>
        </Form>
    )
}