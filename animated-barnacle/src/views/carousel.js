import { useEffect, useRef, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import { marked } from "marked";

export default function MainCarousel() {
  const [markdown, setMarkdown] = useState("");
  const scrollRef = useRef(null);
  const scrollTimerRef = useRef(null);
  const cardCount = 10;
  const [activeIndex, setActiveIndex] = useState(0);
  const isPaused = useRef(false);
  const pauseTimeoutRef = useRef(null);

  // Fetch markdown
  useEffect(() => {
    fetch("https://raw.githubusercontent.com/PeterJohnBishop/FacialRekognition-SwfitUI/main/README.md")
      .then((res) => res.text())
      .then((text) => setMarkdown(marked.parse(text)))
      .catch((err) => console.error("Failed to fetch markdown:", err));
  }, []);

  // Setup auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused.current && scrollRef.current) {
        const nextIndex = (activeIndex + 1) % cardCount;
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

  // Scroll event handler
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
        {[...Array(cardCount)].map((_, i) => (
          <Card className="scroll-card" key={i}>
            <Card.Body>
              {markdown ? (
                <div
                  className="markdown-scroll"
                  onScroll={handleScroll}
                  dangerouslySetInnerHTML={{ __html: markdown }}
                />
              ) : (
                <div className="text-center">
                  <Spinner animation="border" size="sm" /> Loading...
                </div>
              )}
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}
