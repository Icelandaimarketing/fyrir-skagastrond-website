import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  Accessibility,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Briefcase,
  Building2,
  ChevronRight,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Home,
  Landmark,
  MapPinned,
  Palette,
  Sailboat,
  Sparkles,
  Trees,
  Users,
  X,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../i18n/useTranslation';
import { buildPolicyDocumentSections } from '../data/policyProgram';

const CARD_LOGO = '/logo.jpg';
const FLIGHT_ADVANCE_MS = 430;
const FLIGHT_TOTAL_MS = 760;
const FLIGHT_KEYFRAME_TIMES = [0, 0.46, 0.84, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const POLICY_DECK_META = {
  'abyrg-fjarmal': {
    title: '\u00c1byrg fj\u00e1rm\u00e1l',
    Icon: Landmark,
  },
  'atvinnulif-og-ny-taekifaeri': {
    title: 'Atvinnul\u00edf',
    Icon: Briefcase,
  },
  'fjarvinna-og-folksfjolgun': {
    title: 'Fjarvinna',
    Icon: Users,
  },
  husnaedismal: {
    title: 'H\u00fasn\u00e6\u00f0ism\u00e1l',
    Icon: Home,
  },
  'skolamal-og-uppeldi': {
    title: 'Sk\u00f3lam\u00e1l',
    Icon: GraduationCap,
  },
  'samgongur-og-adgengi': {
    title: 'Samg\u00f6ngur',
    Icon: MapPinned,
  },
  'thjonusta-vid-eldri-borgara': {
    title: 'Eldri borgarar',
    Icon: HeartHandshake,
  },
  'ferdathjonusta-og-ny-taekifaeri': {
    title: 'Fer\u00f0a\u00fej\u00f3nusta',
    Icon: Sailboat,
  },
  'umhverfi-og-asynd-baejarins': {
    title: 'Umhverfi',
    Icon: Trees,
  },
  'menning-vidburdir-og-imynd': {
    title: 'Menning',
    Icon: Palette,
  },
  'atvinnutakifaeri-fyrir-alla': {
    title: 'Atvinnut\u00e6kif\u00e6ri',
    Icon: Accessibility,
  },
  'samstarf-gagnsaei-og-traust': {
    title: 'Samstarf',
    Icon: Handshake,
  },
  'skyr-syn-og-framtid': {
    title: 'Sk\u00fdr s\u00fdn',
    Icon: Sparkles,
  },
  sameiningarmal: {
    title: 'Sameiningarm\u00e1l',
    Icon: Building2,
  },
};

function getWrappedIndex(index, length) {
  return ((index % length) + length) % length;
}

function buildCountLabel(position, total) {
  return `${String(position).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
}

function toRelativeRect(containerRect, rect) {
  return {
    top: rect.top - containerRect.top,
    left: rect.left - containerRect.left,
    width: rect.width,
    height: rect.height,
  };
}

function buildDelta(source, destination) {
  return {
    x: destination.left - source.left,
    y: destination.top - source.top,
    scaleX: destination.width / source.width,
    scaleY: destination.height / source.height,
  };
}

function buildTypedParagraphs(paragraphs, visibleChars) {
  let remaining = visibleChars;

  return paragraphs.reduce((accumulator, paragraph, index) => {
    if (remaining <= 0) return accumulator;

    const text = paragraph.slice(0, remaining);
    remaining -= paragraph.length;

    accumulator.push({
      index,
      text,
      isPartial: text.length < paragraph.length,
    });

    return accumulator;
  }, []);
}

function buildFlightKeyframes(from, to) {
  const delta = to - from;

  return [
    from,
    from + (delta * 0.56),
    from + (delta * 0.9),
    to,
  ];
}

export default function PolicyShowcase() {
  const { t, lang } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const documentTitle = t('policyShowcase.documentTitle');
  const documentSections = buildPolicyDocumentSections(lang);
  const deckItems = documentSections.map((section) => {
    const meta = POLICY_DECK_META[section.slug] || {};

    return {
      ...section,
      deckTitle: section.deckTitle || meta.title || section.title,
      Icon: meta.Icon || Sparkles,
    };
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [phase, setPhase] = useState('idle');
  const [direction, setDirection] = useState('next');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [typedChars, setTypedChars] = useState(0);
  const closeButtonRef = useRef(null);
  const triggerButtonRef = useRef(null);
  const deckRef = useRef(null);
  const activeSlotRef = useRef(null);
  const drawTopRef = useRef(null);
  const flightIdRef = useRef(0);
  const animationTimeoutRef = useRef(null);
  const advanceTimeoutRef = useRef(null);
  const typingDelayRef = useRef(null);
  const typingIntervalRef = useRef(null);
  const [flightState, setFlightState] = useState(null);

  useEffect(() => {
    if (activeIndex < deckItems.length) return;
    setActiveIndex(0);
  }, [activeIndex, deckItems.length]);

  useEffect(() => {
    if (!isModalOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
        window.setTimeout(() => triggerButtonRef.current?.focus(), 0);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isModalOpen]);

  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        window.clearTimeout(animationTimeoutRef.current);
        animationTimeoutRef.current = null;
      }

      if (advanceTimeoutRef.current) {
        window.clearTimeout(advanceTimeoutRef.current);
        advanceTimeoutRef.current = null;
      }

      if (typingDelayRef.current) {
        window.clearTimeout(typingDelayRef.current);
        typingDelayRef.current = null;
      }

      if (typingIntervalRef.current) {
        window.clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }
    };
  }, []);

  if (!deckItems.length) return null;

  const totalItems = deckItems.length;
  const isAnimating = phase === 'animating';
  const nextIndex = getWrappedIndex(activeIndex + 1, totalItems);
  const activeItem = deckItems[activeIndex];
  const drawDisplayOffset = flightState
    && (
      (flightState.direction === 'next' && !flightState.advanced)
      || (flightState.direction === 'prev' && flightState.advanced)
    )
    ? 1
    : 0;
  const visibleTopItem = deckItems[getWrappedIndex(activeIndex + 1 + drawDisplayOffset, totalItems)];
  const queuedItems = Array.from({ length: 3 }, (_, offset) => (
    deckItems[getWrappedIndex(activeIndex + 2 + drawDisplayOffset + offset, totalItems)]
  ));
  const ActiveIcon = activeItem.Icon;
  const activeCountLabel = buildCountLabel(activeItem.position, totalItems);
  const totalBodyChars = activeItem.paragraphs.reduce((sum, paragraph) => sum + paragraph.length, 0);
  const shouldDelayActiveDetails = Boolean(
    flightState
    && flightState.direction === 'next'
    && flightState.advanced
    && activeItem.slug === flightState.item.slug
  );
  const cardTransition = prefersReducedMotion
    ? { duration: 0 }
    : {
      duration: 0.26,
      ease: [0.22, 1, 0.36, 1],
    };
  const coverTransition = prefersReducedMotion
    ? { duration: 0 }
    : {
      duration: 0.22,
      ease: [0.22, 1, 0.36, 1],
    };

  const bodyVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : {
          when: 'beforeChildren',
          delayChildren: 0.04,
          staggerChildren: 0.04,
        },
      },
    };

  useEffect(() => {
    if (typingDelayRef.current) {
      window.clearTimeout(typingDelayRef.current);
      typingDelayRef.current = null;
    }

    if (typingIntervalRef.current) {
      window.clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }

    if (prefersReducedMotion) {
      setTypedChars(totalBodyChars);
      return undefined;
    }

    if (shouldDelayActiveDetails) {
      setTypedChars(0);
      return undefined;
    }

    setTypedChars(0);

    const charactersPerStep = Math.max(18, Math.ceil(totalBodyChars / 28));

    typingDelayRef.current = window.setTimeout(() => {
      typingIntervalRef.current = window.setInterval(() => {
        setTypedChars((current) => {
          const next = Math.min(totalBodyChars, current + charactersPerStep);

          if (next >= totalBodyChars && typingIntervalRef.current) {
            window.clearInterval(typingIntervalRef.current);
            typingIntervalRef.current = null;
          }

          return next;
        });
      }, 18);
    }, 70);

    return () => {
      if (typingDelayRef.current) {
        window.clearTimeout(typingDelayRef.current);
        typingDelayRef.current = null;
      }

      if (typingIntervalRef.current) {
        window.clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }
    };
  }, [activeItem.slug, prefersReducedMotion, shouldDelayActiveDetails, totalBodyChars]);

  const bodyItemVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : {
          duration: 0.18,
          ease: 'easeOut',
        },
    },
  };

  const renderCoverInner = (item, variant = 'full') => {
    const CoverIcon = item.Icon || Sparkles;
    const showTitle = variant !== 'queued';
    const showLogo = variant === 'full' || variant === 'queued';

    return (
      <div className={`policy-showcase__cover-inner policy-showcase__cover-inner--${variant}`}>
        {showLogo && (
          <div className="policy-showcase__cover-brand" aria-hidden="true">
            <img
              src={CARD_LOGO}
              alt=""
              className="policy-showcase__cover-logo"
            />
          </div>
        )}

        <div className="policy-showcase__cover-main">
          <div className="policy-showcase__icon-box policy-showcase__icon-box--cover">
            <CoverIcon size={variant === 'queued' ? 22 : 28} strokeWidth={2.1} />
          </div>

          {showTitle && (
            <h3 className="policy-showcase__cover-title">
              {item.deckTitle}
            </h3>
          )}
        </div>
      </div>
    );
  };

  const startNavigation = (nextDirection) => {
    if (isAnimating || totalItems <= 1) return;

    const targetIndex = getWrappedIndex(activeIndex + (nextDirection === 'next' ? 1 : -1), totalItems);
    setDirection(nextDirection);

    if (prefersReducedMotion) {
      setActiveIndex(targetIndex);
      return;
    }

    const nextFlightState = buildFlightStateForDirection(nextDirection, targetIndex);

    if (!nextFlightState) {
      setActiveIndex(targetIndex);
      return;
    }

    if (animationTimeoutRef.current) {
      window.clearTimeout(animationTimeoutRef.current);
    }

    if (advanceTimeoutRef.current) {
      window.clearTimeout(advanceTimeoutRef.current);
    }

    setPhase('animating');
    setFlightState(nextFlightState);

    advanceTimeoutRef.current = window.setTimeout(() => {
      setActiveIndex(targetIndex);
      setFlightState((current) => (current ? { ...current, advanced: true } : null));
      advanceTimeoutRef.current = null;
    }, FLIGHT_ADVANCE_MS);

    animationTimeoutRef.current = window.setTimeout(() => {
      finalizeNavigation();
    }, FLIGHT_TOTAL_MS);
  };

  useEffect(() => {
    if (isModalOpen || isInteracting || isAnimating || totalItems <= 1) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      startNavigation('next');
    }, 6000);

    return () => window.clearInterval(intervalId);
  }, [activeIndex, isAnimating, isInteracting, isModalOpen, totalItems, prefersReducedMotion]);

  const closeModal = () => {
    setIsModalOpen(false);
    window.setTimeout(() => triggerButtonRef.current?.focus(), 0);
  };

  const typedParagraphs = prefersReducedMotion
    ? activeItem.paragraphs.map((paragraph, index) => ({
      index,
      text: paragraph,
      isPartial: false,
    }))
    : buildTypedParagraphs(activeItem.paragraphs, typedChars);
  const isTyping = !prefersReducedMotion && typedChars < totalBodyChars;
  const shouldShiftDrawCard = Boolean(flightState);
  const flightTransition = {
    duration: FLIGHT_TOTAL_MS / 1000,
    times: FLIGHT_KEYFRAME_TIMES,
    ease: 'linear',
  };

  const renderFlightReveal = (item, countLabel) => {
    const FlightIcon = item.Icon || Sparkles;

    return (
      <div className="policy-showcase__flight-reveal">
        <span className="policy-showcase__active-mark policy-showcase__active-mark--flight" aria-hidden="true">
          X
        </span>

        <div className="policy-showcase__active-top">
          <div className="policy-showcase__icon-box policy-showcase__icon-box--active">
            <FlightIcon size={30} strokeWidth={2.1} />
          </div>

          <div className="policy-showcase__counter">{countLabel}</div>
        </div>

        <h3 className="policy-showcase__active-title">{item.deckTitle}</h3>
      </div>
    );
  };

  const buildFlightStateForDirection = (nextDirection, targetIndex) => {
    const deckRect = deckRef.current?.getBoundingClientRect();
    const activeRect = activeSlotRef.current?.getBoundingClientRect();
    const drawRect = drawTopRef.current?.getBoundingClientRect();

    if (!deckRect || !activeRect || !drawRect) return null;

    const active = toRelativeRect(deckRect, activeRect);
    const draw = toRelativeRect(deckRect, drawRect);

    if (nextDirection === 'next') {
      return {
        id: `flight-${flightIdRef.current += 1}`,
        direction: 'next',
        item: visibleTopItem,
        countLabel: buildCountLabel(deckItems[targetIndex].position, totalItems),
        source: draw,
        delta: buildDelta(draw, active),
        rotateFrom: 2.6,
        rotateTo: -5.2,
        flipFrom: 0,
        flipTo: 180,
        advanced: false,
      };
    }

    return {
      id: `flight-${flightIdRef.current += 1}`,
      direction: 'prev',
      item: activeItem,
      countLabel: activeCountLabel,
      source: active,
      delta: buildDelta(active, draw),
      rotateFrom: -1.4,
      rotateTo: 3.8,
      flipFrom: 180,
      flipTo: 360,
      advanced: false,
    };
  };

  const finalizeNavigation = () => {
    setPhase('idle');
    setFlightState(null);

    if (animationTimeoutRef.current) {
      window.clearTimeout(animationTimeoutRef.current);
      animationTimeoutRef.current = null;
    }

    if (advanceTimeoutRef.current) {
      window.clearTimeout(advanceTimeoutRef.current);
      advanceTimeoutRef.current = null;
    }
  };

  return (
    <section id="stefna" className="section section--sky section--soft-top policy-showcase">
      <div className="container">
        <motion.div
          className="section__header section__header--left policy-showcase__intro"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <span className="badge badge--red">{t('policyShowcase.badge')}</span>
          <h2 className="policy-showcase__heading">
            <button
              ref={triggerButtonRef}
              type="button"
              className="policy-showcase__document-trigger"
              onClick={() => setIsModalOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={isModalOpen}
              aria-label={`${t('policyShowcase.open')}: ${documentTitle}`}
            >
              <span className="policy-showcase__document-title">{documentTitle}</span>
              <span className="policy-showcase__document-meta">
                <BookOpen size={18} />
                {t('policyShowcase.open')}
              </span>
            </button>
          </h2>
          <p className="section__subtitle policy-showcase__subtitle">{t('policyShowcase.subtitle')}</p>
        </motion.div>

        <motion.div
          ref={deckRef}
          className="policy-showcase__deck"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          onMouseEnter={() => setIsInteracting(true)}
          onMouseLeave={() => setIsInteracting(false)}
          onFocusCapture={() => setIsInteracting(true)}
          onBlurCapture={(event) => {
            const nextFocus = event.relatedTarget;
            if (!nextFocus || !event.currentTarget.contains(nextFocus)) {
              setIsInteracting(false);
            }
          }}
        >
          <div className="policy-showcase__deck-nav">
            <button
              type="button"
              className="policy-showcase__control policy-showcase__control--prev"
              onClick={() => startNavigation('prev')}
              disabled={isAnimating}
              aria-label={t('policyShowcase.previous')}
            >
              <ArrowLeft size={18} />
            </button>

            <button
              type="button"
              className="policy-showcase__control policy-showcase__control--next"
              onClick={() => startNavigation('next')}
              disabled={isAnimating}
              aria-label={t('policyShowcase.next')}
            >
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="policy-showcase__reveal-pile">
            <div className="policy-showcase__history-base" aria-hidden="true" />

            <div ref={activeSlotRef} className="policy-showcase__active-slot">
              <AnimatePresence initial={false}>
                <motion.article
                  key={activeItem.slug}
                  className="policy-showcase__active-card"
                  initial={prefersReducedMotion || flightState ? false : {
                    opacity: 0,
                    x: direction === 'next' ? -44 : 34,
                    y: 10,
                    scale: 0.988,
                  }}
                  animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                  exit={prefersReducedMotion || flightState ? undefined : {
                    opacity: 0,
                    x: direction === 'next' ? 20 : -20,
                    y: -8,
                    scale: 0.988,
                  }}
                  transition={cardTransition}
                >
                  <span className="policy-showcase__active-mark" aria-hidden="true">
                    X
                  </span>

                  <div className="policy-showcase__active-top">
                    <div className="policy-showcase__icon-box policy-showcase__icon-box--active">
                      <ActiveIcon size={30} strokeWidth={2.1} />
                    </div>

                    <div className="policy-showcase__counter">{activeCountLabel}</div>
                  </div>

                  <h3 className="policy-showcase__active-title">{activeItem.deckTitle}</h3>

                  {!shouldDelayActiveDetails && (
                    <>
                      <motion.div
                        key={`body-${activeItem.slug}`}
                        className="policy-showcase__active-body"
                        variants={bodyVariants}
                        initial={prefersReducedMotion ? false : 'hidden'}
                        animate="visible"
                      >
                        {typedParagraphs.map((paragraph, index) => (
                          <motion.p
                            key={`${activeItem.slug}-${paragraph.index}`}
                            variants={bodyItemVariants}
                          >
                            {paragraph.text}
                            {isTyping && index === typedParagraphs.length - 1 && (
                              <span className="policy-showcase__typing-caret" aria-hidden="true" />
                            )}
                          </motion.p>
                        ))}
                      </motion.div>

                      <motion.div
                        className="policy-showcase__active-footer"
                        variants={bodyVariants}
                        initial={prefersReducedMotion ? false : 'hidden'}
                        animate="visible"
                      >
                        <motion.div variants={bodyItemVariants}>
                          <Link to={activeItem.href} className="policy-showcase__active-link">
                            {t('policyShowcase.readMore')} <ChevronRight size={17} />
                          </Link>
                        </motion.div>
                      </motion.div>
                    </>
                  )}
                </motion.article>
              </AnimatePresence>
            </div>
          </div>

          <div className="policy-showcase__draw-pile">
            <div className="policy-showcase__draw-stack">
              {queuedItems.map((item, index) => (
                <div
                  key={`queued-${item.slug}-${index}`}
                  className={`policy-showcase__queued-card policy-showcase__queued-card--${index + 1}`}
                  aria-hidden="true"
                >
                  {renderCoverInner(item, 'queued')}
                </div>
              ))}

              <div ref={drawTopRef} className="policy-showcase__draw-slot">
                <motion.button
                  type="button"
                  className="policy-showcase__cover-card"
                  aria-label={`${t('policyShowcase.next')}: ${visibleTopItem.deckTitle}`}
                  onClick={() => startNavigation('next')}
                  disabled={isAnimating}
                  animate={
                    prefersReducedMotion
                      ? { opacity: 1, scale: 1, x: 0, y: 0 }
                      : {
                        opacity: shouldShiftDrawCard ? 0.94 : 1,
                        scale: shouldShiftDrawCard ? 0.986 : 1,
                        x: shouldShiftDrawCard ? 8 : 0,
                        y: shouldShiftDrawCard ? 4 : 0,
                        rotate: shouldShiftDrawCard ? 4.2 : 2.6,
                      }
                  }
                  whileHover={prefersReducedMotion || isAnimating ? undefined : { y: -4, x: -2, rotate: 1.2 }}
                  whileTap={prefersReducedMotion || isAnimating ? undefined : { scale: 0.985 }}
                  transition={coverTransition}
                >
                  {renderCoverInner(visibleTopItem, 'full')}
                </motion.button>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {flightState && !prefersReducedMotion && (
              <motion.div
                key={flightState.id}
                className="policy-showcase__flight-card"
                style={{
                  top: flightState.source.top,
                  left: flightState.source.left,
                  width: flightState.source.width,
                  height: flightState.source.height,
                }}
                initial={{
                  x: 0,
                  y: 0,
                  scaleX: 1,
                  scaleY: 1,
                  rotate: flightState.rotateFrom,
                  opacity: 1,
                }}
                animate={{
                  x: buildFlightKeyframes(0, flightState.delta.x),
                  y: buildFlightKeyframes(0, flightState.delta.y),
                  scaleX: buildFlightKeyframes(1, flightState.delta.scaleX),
                  scaleY: buildFlightKeyframes(1, flightState.delta.scaleY),
                  rotate: buildFlightKeyframes(flightState.rotateFrom, flightState.rotateTo),
                  opacity: [1, 1, 0.92, 0],
                }}
                transition={flightTransition}
              >
                <motion.div
                  className="policy-showcase__flight-inner"
                  initial={{ rotateY: flightState.flipFrom }}
                  animate={{
                    rotateY: [
                      flightState.flipFrom,
                      flightState.flipFrom,
                      flightState.flipTo,
                      flightState.flipTo,
                    ],
                  }}
                  transition={{
                    duration: FLIGHT_TOTAL_MS / 1000,
                    ease: [0.2, 0.82, 0.24, 1],
                    times: [0, 0.28, 0.72, 1],
                  }}
                >
                  <div className="policy-showcase__flight-face policy-showcase__flight-face--back">
                    <div className="policy-showcase__flight-surface">
                      {renderCoverInner(flightState.item, 'full')}
                    </div>
                  </div>

                  <div className="policy-showcase__flight-face policy-showcase__flight-face--front">
                    {renderFlightReveal(flightState.item, flightState.countLabel)}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {isModalOpen && (
        <div
          className="policy-showcase__modal"
          role="dialog"
          aria-modal="true"
          aria-label={documentTitle}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div className="policy-showcase__modal-card">
            <div className="policy-showcase__modal-header">
              <div className="policy-showcase__modal-headings">
                <div className="policy-showcase__modal-eyebrow">{t('policyShowcase.badge')}</div>
                <div className="policy-showcase__modal-title">{documentTitle}</div>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                className="policy-showcase__modal-close"
                onClick={closeModal}
              >
                <X size={18} />
                <span>{t('policyShowcase.close')}</span>
              </button>
            </div>

            <div className="policy-showcase__modal-body">
              {documentSections.map((section) => (
                <article key={section.slug} className="policy-showcase__modal-section">
                  <div className="policy-showcase__modal-section-header">
                    <span className="policy-showcase__modal-kicker">{section.category}</span>
                    <span className="policy-showcase__modal-number">
                      {String(section.position).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="policy-showcase__modal-section-title">{section.title}</h3>
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={`${section.slug}-${index}`}>{paragraph}</p>
                  ))}
                </article>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
