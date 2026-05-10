import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

export default function TiltCard({
  children,
}: {
  children: React.ReactNode;
}) {

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const smoothRotateX = useSpring(rotateX, {
    stiffness: 120,
    damping: 15,
  });

  const smoothRotateY = useSpring(rotateY, {
    stiffness: 120,
    damping: 15,
  });

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {

    const rect =
      e.currentTarget.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rotateXValue =
      ((mouseY - height / 2) / height) * -15;

    const rotateYValue =
      ((mouseX - width / 2) / width) * 15;

    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
  };

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        transformPerspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
}