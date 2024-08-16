import {
  FocusLayout,
  FocusLayoutContainer,
  isTrackReference,
  useLocalParticipant,
  useSpeakingParticipants,
  useTracks
} from '@livekit/components-react';
import { Track } from 'livekit-client';
import React, { useEffect } from 'react';
import useDeviceType from '../../../../_hooks/useDeviceType';
import useFocosedTrack from '../../_store/useFocusTrack';
import { VideoConferenceProps } from '../../_types/VideoConforenceProps';
import FocusedVideoTrack from '../FocusedVideoTrack';
import ParticipantListLayout from '../RemoteParticipant/RemoteParticipant';

const WebLayout = ({ tracks }: VideoConferenceProps) => {
  const { focusedTrack, setFocusedTrack } = useFocosedTrack();
  const { isMobile } = useDeviceType();
  const { localParticipant } = useLocalParticipant();
  const speaker = useSpeakingParticipants();
  const speakerTrackRef = tracks.find((track) => track.participant.isSpeaking);
  const screenShareTrackRef = useTracks([Track.Source.ScreenShare])[0];
  const localTracks = tracks.filter((track) => track.participant.sid === localParticipant.sid)[0];

  useEffect(() => {
    if (!focusedTrack) {
      console.log('포커싱된 트랙이 없음.');
      if (isTrackReference(localTracks)) {
        setFocusedTrack(localTracks);
      }
    }
  }, []);

  useEffect(() => {
    if (isTrackReference(speaker[0]) && !screenShareTrackRef) {
      setFocusedTrack(speaker[0]);
    }
  }, [speaker]);

  useEffect(() => {
    if (screenShareTrackRef) {
      setFocusedTrack(screenShareTrackRef);
    }
  }, [screenShareTrackRef]);

  useEffect(() => {
    if (!localTracks) return;
    if (isTrackReference(localTracks)) {
      setFocusedTrack(localTracks);
    }
  }, [localTracks, isMobile]);

  //md:w-[65vw] lg:w-[70vw] xl:w-[75vw] md:ml-[2rem] lg:ml-[3rem] xl:ml-[4rem]
  return (
    <FocusLayoutContainer className={`relative flex items-end justify-end h-full overflow-hidden`}>
      <div style={{ width: 'calc(100% - 300px)' }} id="focusTrackWrapper" className="absolute pl-[4rem] top-0 bottom-0">
        {focusedTrack ? (
          <FocusLayout trackRef={focusedTrack} className="h-full w-full">
            <FocusedVideoTrack focusedTrackRef={focusedTrack} />
          </FocusLayout>
        ) : (
          <div className="w-[75vw]"></div>
        )}
      </div>
      <div id="participantLayoutWrapper" className="absolute top-0 right-0 flex flex-shrink-0 h-full w-[300px] ">
        <ParticipantListLayout />
      </div>
    </FocusLayoutContainer>
  );
};

export default React.memo(WebLayout);
