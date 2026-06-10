'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
      dataLayer: Record<string, unknown>[];
        }
        }

        export function HubSpotMeetingEvents() {
          useEffect(() => {
              window.dataLayer = window.dataLayer || [];

                  const handleMessage = (event: MessageEvent) => {
                        if (event.data?.type === 'hsFormCallback' || event.data?.meetingsFetchTimeslots) {
                                window.dataLayer.push({ event: 'meetings_embed_loaded' });
                                      }
                                            if (event.data?.meetingBookSucceeded) {
                                                    window.dataLayer.push({
                                                              event: 'hubspot_meeting_booked',
                                                                        hs_meeting_details: event.data,
                                                                                });
                                                                                      }
                                                                                          };

                                                                                              window.addEventListener('message', handleMessage);
                                                                                                  return () => window.removeEventListener('message', handleMessage);
                                                                                                    }, []);

                                                                                                      return null;
                                                                                                      }