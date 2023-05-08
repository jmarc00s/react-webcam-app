import "./App.css";
import { useEffect, useRef } from "react";

export const App = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const width = 1280;
  const height = 720;

  useEffect(() => {
    const getCams = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width, height },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
        };
      }
    };

    getCams();
  }, []);

  const handleScreenShotClick = () => {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("width", width.toString());
    canvas.setAttribute("height", height.toString());

    const context = canvas?.getContext("2d");
    context?.drawImage(
      videoRef.current as CanvasImageSource,
      0,
      0,
      width,
      height
    );
    const data = canvas?.toDataURL("image/png");
    download(data!);
  };

  const download = (base64: string) => {
    const link = document.createElement("a");
    link.download = "photo.png";
    link.href = base64;
    link.click();
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <h1>React photo app</h1>
      <video ref={videoRef} id="cam" />
      <button onClick={handleScreenShotClick}>Take screenshot</button>
    </div>
  );
};
