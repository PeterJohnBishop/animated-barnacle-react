import { useEffect, useRef, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import { marked } from "marked";

const markdownUrls = [
  "https://raw.githubusercontent.com/PeterJohnBishop/FacialRekognition-SwfitUI/main/README.md",
  "https://raw.githubusercontent.com/PeterJohnBishop/Go-Secure-Requests/main/README.md",
  "https://raw.githubusercontent.com/PeterJohnBishop/WeatherNotifications-SwiftUI/main/README.md",
  "https://raw.githubusercontent.com/PeterJohnBishop/Go-API-Containerization/main/README.md",
  "https://raw.githubusercontent.com/PeterJohnBishop/supreme-eureka/main/README.md"
];

export default function MainCarousel() {
  const [markdowns, setMarkdowns] = useState([]);
  const scrollRef = useRef(null);
  const scrollTimerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isPaused = useRef(false);
  const pauseTimeoutRef = useRef(null);

  useEffect(() => {
    Promise.all(
      markdownUrls.map((url) =>
        fetch(url)
          .then((res) => res.text())
          .then((text) => marked.parse(text))
          .catch((err) => {
            console.error(`Failed to fetch ${url}:`, err);
            return "Error loading markdown.";
          })
      )
    ).then(setMarkdowns);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused.current && scrollRef.current) {
        const nextIndex = (activeIndex + 1) % markdownUrls.length;
        scrollRef.current.scrollTo({
          left: scrollRef.current.clientWidth * nextIndex,
          behavior: "smooth",
        });
        setActiveIndex(nextIndex);
      }
    }, 10000);

    scrollTimerRef.current = interval;
    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleScroll = () => {
    isPaused.current = true;
    clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      isPaused.current = false;
    }, 2000);
  };

  return (
    <div id="carousel" className="carousel-section" ref={scrollRef}>
      <div className="scrolling-wrapper">
        {markdowns.length === 0 ? (
          [...Array(markdownUrls.length)].map((_, i) => (
            <Card className="scroll-card" key={i}>
              <Card.Body className="d-flex align-items-center justify-content-center">
                <Spinner animation="border" />
              </Card.Body>
            </Card>
          ))
        ) : (
          markdowns.map((md, i) => (
            <Card className="scroll-card" key={i}>
              <Card.Body>
                <div
                  className="markdown-scroll"
                  onScroll={handleScroll}
                  dangerouslySetInnerHTML={{ __html: md }}
                />
              </Card.Body>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
