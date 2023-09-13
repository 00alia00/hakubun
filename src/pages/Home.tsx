import { useState, useEffect, useRef } from "react";
import { IonGrid, IonCol, IonRow, IonSkeletonText } from "@ionic/react";
import { PanInfo, motion, useAnimation, useMotionValue } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import { useUserAuth } from "../contexts/AuthContext";
import LevelProgressBar from "../components/LevelProgressBar/LevelProgressBar";
import HomeHeader from "../components/HomeHeader";
import LessonsButton from "../components/LessonsButton/LessonsButton";
import ReviewsButton from "../components/ReviewsButton/ReviewsButton";
import RadicalForLvlCard from "../components/RadicalForLvlCard/RadicalForLvlCard";
import KanjiForLvlCard from "../components/KanjiForLvlCard/KanjiForLvlCard";
import SrsStages from "../components/SrsStages/SrsStages";
import AnimatedPage from "../components/AnimatedPage";
import FloatingTabBar from "../components/FloatingTabBar";
import ReviewForecast from "../components/ReviewForecast";
import LoadingDots from "../components/LoadingDots";
import RefreshIcon from "../images/refresh.svg";
import { FixedCenterContainer } from "../styles/BaseStyledComponents";
import styled from "styled-components";

const RelPageContainer = styled.div`
  overflow-y: auto;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const DraggableMainContent = styled(motion.main)`
  padding: 5px 5px 85px 5px;
`;

const REFRESH_MAX_SIZE = 100;

const refreshingVariants = {
  hidden: { height: 0, width: 0, rotate: 0, marginTop: 0, marginBottom: 0 },
  refreshing: {
    height: REFRESH_MAX_SIZE,
    width: REFRESH_MAX_SIZE,
    marginTop: 20,
    marginBottom: 20,
  },
  spin: { rotate: -360, transition: { duration: 2, repeat: Infinity } },
  complete: { height: 0, width: 0, rotate: 0, marginTop: 0, marginBottom: 0 },
};

const Home = () => {
  const queryClient = useQueryClient();
  const appContext = useUserAuth();
  const [homeLoading, setHomeLoading] = useState(false);
  const [level, setLevel] = useState<number>(0);
  const scrollY = useMotionValue(0);
  const controls = useAnimation();
  const relPageContainerRef = useRef<HTMLDivElement>(null);

  // TODO: remove spinner for loading, just using text skeletons instead
  useEffect(() => {
    setHomeLoading(true);
    setUserDetails();
    setHomeLoading(false);
  }, [appContext.isAuthenticated]);

  const setUserDetails = () => {
    let userData = appContext.user;
    if (userData !== null) {
      setLevel(userData.level);
    }
  };

  // TODO: fix so only allows drag when scrolled to top of page
  const onDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.y > 200) {
      controls.start("refreshing");
      controls.start("spin");
      queryClient.invalidateQueries();

      // TODO: change so checks that data was completely loaded before setting to complete
      setTimeout(() => {
        controls.start("complete");
      }, 5000);
    }
  };

  return (
    <>
      <AnimatedPage>
        <HomeHeader></HomeHeader>
        <RelPageContainer ref={relPageContainerRef}>
          <LoadingContainer>
            <motion.img
              initial="hidden"
              animate={controls}
              src={RefreshIcon}
              variants={refreshingVariants}
            />
          </LoadingContainer>
          <DraggableMainContent
            drag="y"
            dragConstraints={relPageContainerRef}
            style={{
              y: scrollY,
            }}
            onDragEnd={onDragEnd}
          >
            <IonGrid>
              {!homeLoading ? (
                <>
                  <IonRow>
                    <IonCol>
                      <LessonsButton />
                    </IonCol>
                    <IonCol>
                      <ReviewsButton level={level}></ReviewsButton>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <LevelProgressBar level={level} />
                    </IonCol>
                  </IonRow>
                  <IonRow class="ion-justify-content-start">
                    <IonCol>
                      <RadicalForLvlCard level={level}></RadicalForLvlCard>
                    </IonCol>
                  </IonRow>
                  <IonRow class="ion-justify-content-start">
                    <IonCol>
                      <KanjiForLvlCard level={level}></KanjiForLvlCard>
                    </IonCol>
                  </IonRow>
                  <IonRow class="ion-justify-content-start">
                    <SrsStages></SrsStages>
                  </IonRow>
                  <IonRow class="ion-justify-content-start">
                    <ReviewForecast />
                  </IonRow>
                </>
              ) : (
                <IonSkeletonText animated={true}></IonSkeletonText>
              )}
            </IonGrid>
            {homeLoading && (
              <FixedCenterContainer>
                <LoadingDots />
              </FixedCenterContainer>
            )}
          </DraggableMainContent>
        </RelPageContainer>
        <FloatingTabBar />
      </AnimatedPage>
    </>
  );
};

export default Home;
