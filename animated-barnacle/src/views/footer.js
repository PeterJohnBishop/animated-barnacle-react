import { Container } from "react-bootstrap";

export default function MainFooter() {
        return (

<footer id="footer" className="bg-dark text-white py-4">
        <Container className="text-center">
          <p>Contact me at: peterjbishop.denver@gmail.com</p>
          <p>
            <a href="#" className="text-white mx-2">GitHub</a>
            <a href="#" className="text-white mx-2">LinkedIn</a>
          </p>
        </Container>
      </footer>
        );
}