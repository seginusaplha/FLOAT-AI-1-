import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

export const useGSAPTimeline = (triggerRef, dependencies = []) => {
  const timelineRef = useRef();

  useEffect(() => {
    if (triggerRef.current) {
      // Create timeline
      timelineRef.current = gsap.timeline();
      
      // Set initial states
      gsap.set(triggerRef.current.querySelectorAll('.gsap-fade-up'), {
        opacity: 0,
        y: 100,
      });
      
      gsap.set(triggerRef.current.querySelectorAll('.gsap-fade-left'), {
        opacity: 0,
        x: -100,
      });
      
      gsap.set(triggerRef.current.querySelectorAll('.gsap-fade-right'), {
        opacity: 0,
        x: 100,
      });

      return () => {
        if (timelineRef.current) {
          timelineRef.current.kill();
        }
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  }, [triggerRef, ...dependencies]);

  const animateIn = (delay = 0) => {
    if (timelineRef.current && triggerRef.current) {
      timelineRef.current
        .to(triggerRef.current.querySelectorAll('.gsap-fade-up'), {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          delay,
        })
        .to(triggerRef.current.querySelectorAll('.gsap-fade-left'), {
          opacity: 1,
          x: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
        }, '-=0.5')
        .to(triggerRef.current.querySelectorAll('.gsap-fade-right'), {
          opacity: 1,
          x: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
        }, '-=0.5');
    }
  };

  const typeWriter = (element, text, speed = 50) => {
    if (element) {
      gsap.set(element, { text: '' });
      gsap.to(element, {
        duration: text.length * speed / 1000,
        text: {
          value: text,
          delimiter: '',
        },
        ease: 'none',
      });
    }
  };

  return { animateIn, typeWriter, timeline: timelineRef.current };
};