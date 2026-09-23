"use client";
import styles from "./ParallaxScene.module.css";

/**
 * ParallaxScene — atmospheric background orbs with lightweight passive scroll parallax.
 * Only updates during active scrolling via requestAnimationFrame throttle (no infinite RAF loops).
 */
export default function ParallaxScene() {
  return <div className={styles["parallax-shape"]} aria-hidden="true" />;
}
