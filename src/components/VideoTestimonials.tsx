import { useState, useRef, useCallback, useEffect } from 'react';
import { Play, X, Volume2, VolumeX } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

const videos = [
  {
    id: '1',
    videoUrl: '/3773487-hd_1920_1080_30fps.mp4',
    thumbnail: '/3773487-hd_1920_1080_30fps.png',
    title: 'Tour pelo Projeto - Sala de Estar Completa',
    duration: '0:06',
    customer: 'Kerlon Amaral',
    isVertical: false,
  },
  {
    id: '2',
    videoUrl: '/15887133-uhd_3840_2160_30fps.mp4',
    thumbnail: '/15887133-uhd_3840_2160_30fps.png',
    title: 'Unboxing do Quarto dos Sonhos',
    duration: '0:19',
    customer: 'Kerlon Amaral',
    isVertical: false,
  },
  {
    id: '3',
    videoUrl: '/6998652-hd_1080_1920_25fps.mp4',
    thumbnail: '/6998652-hd_1080_1920_25fps.png',
    title: 'Escritório Home Office Premium',
    duration: '0:35',
    customer: 'Kerlon Amaral',
    isVertical: false,
  },
  {
    id: '4',
    videoUrl: '/3773486-hd_1920_1080_30fps.mp4',
    thumbnail: '/3773486-hd_1920_1080_30fps.png',
    title: 'Sala de Jantar para 8 Pessoas',
    duration: '0:10',
    customer: 'Kerlon Amaral',
    isVertical: true,
  },
  {
    id: '5',
    videoUrl: '/3555398-hd_1920_1080_30fps.mp4',
    thumbnail: '/3555398-hd_1920_1080_30fps.png',
    title: 'Varanda Gourmet Completa',
    duration: '0:40',
    customer: 'Kerlon Amaral',
    isVertical: true,
  },
];

export const VideoTestimonials = () => {
  const [selectedVideo, setSelectedVideo] = useState<(typeof videos)[0] | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const videoRef = useRef<HTMLVideoElement>(null);
  const previewVideoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCloseVideo = () => {
    setSelectedVideo(null);
    setIsMuted(false);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleMouseEnter = useCallback((videoId: string) => {
    setHoveredVideo(videoId);
    const video = previewVideoRefs.current.get(videoId);
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  }, []);

  const handleMouseLeave = useCallback((videoId: string) => {
    setHoveredVideo(null);
    const video = previewVideoRefs.current.get(videoId);
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, currentIndex: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = Math.min(currentIndex + 1, videos.length - 1);
      setFocusedIndex(nextIndex);
      cardRefs.current[nextIndex]?.focus();
      cardRefs.current[nextIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = Math.max(currentIndex - 1, 0);
      setFocusedIndex(prevIndex);
      cardRefs.current[prevIndex]?.focus();
      cardRefs.current[prevIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedVideo(videos[currentIndex]);
    }
  }, []);

  useEffect(() => {
    return () => {
      previewVideoRefs.current.forEach((video) => {
        video.pause();
      });
    };
  }, []);

  return (
    <section className="py-8 md:py-12 lg:py-16 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">Vídeos de Clientes</h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            Veja as experiências reais de quem transformou seus ambientes conosco
          </p>
          <p className="text-xs text-muted-foreground mt-2">Use as setas ← → para navegar</p>
        </div>

        <ScrollArea className="w-full whitespace-nowrap">
          <div
            ref={containerRef}
            role="listbox"
            aria-label="Depoimentos em vídeo - use as setas para navegar"
            className="flex gap-3 md:gap-4 pb-4"
          >
            {videos.map((video, index) => (
              <button
                key={video.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                tabIndex={0}
                onFocus={() => setFocusedIndex(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onClick={() => setSelectedVideo(video)}
                onMouseEnter={() => handleMouseEnter(video.id)}
                onMouseLeave={() => handleMouseLeave(video.id)}
                className={cn(
                  'flex-shrink-0 w-40 sm:w-48 md:w-56 lg:w-64 group text-left animate-fade-in',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl',
                )}
                style={{ animationDelay: `${index * 100}ms` }}
                aria-label={`${video.title} por ${video.customer}`}
              >
                <div className="relative overflow-hidden rounded-lg md:rounded-xl aspect-[9/16] mb-2 md:mb-3">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className={cn(
                      'w-full h-full object-cover transition-all duration-500',
                      hoveredVideo === video.id ? 'opacity-0 scale-105' : 'opacity-100 scale-100',
                    )}
                  />

                  <video
                    ref={(el) => {
                      if (el) previewVideoRefs.current.set(video.id, el);
                    }}
                    src={video.videoUrl}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className={cn(
                      'absolute inset-0 w-full h-full object-cover transition-opacity duration-500',
                      hoveredVideo === video.id ? 'opacity-100' : 'opacity-0',
                    )}
                  />

                  <div
                    className={cn(
                      'absolute inset-0 transition-colors duration-300',
                      hoveredVideo === video.id
                        ? 'bg-foreground/20'
                        : 'bg-foreground/30 group-hover:bg-foreground/40',
                    )}
                  />

                  <div
                    className={cn(
                      'absolute inset-0 flex items-center justify-center transition-all duration-300',
                      hoveredVideo === video.id ? 'opacity-70 scale-90' : 'opacity-100 scale-100',
                    )}
                  >
                    <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-primary/90 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-focus-visible:scale-110">
                      <Play className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 text-primary-foreground fill-current ml-0.5 md:ml-1" />
                    </div>
                  </div>

                  <div className="absolute bottom-2 md:bottom-3 right-2 md:right-3 px-1.5 md:px-2 py-0.5 md:py-1 rounded bg-foreground/80 text-background text-[10px] md:text-xs font-medium">
                    {video.duration}
                  </div>

                  {hoveredVideo === video.id && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-primary text-primary-foreground text-[10px] font-medium animate-fade-in">
                      Prévia
                    </div>
                  )}
                </div>

                <h3 className="font-medium text-xs md:text-sm line-clamp-2 whitespace-normal mb-0.5 md:mb-1">
                  {video.title}
                </h3>
                <p className="text-[10px] md:text-xs text-muted-foreground">Por {video.customer}</p>
              </button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <Dialog open={!!selectedVideo} onOpenChange={handleCloseVideo}>
          <DialogContent
            className={cn(
              'p-0 overflow-hidden bg-black border-none',
              selectedVideo?.isVertical
                ? 'max-w-[90vw] sm:max-w-sm md:max-w-md'
                : 'max-w-[95vw] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl',
            )}
          >
            <button
              onClick={handleCloseVideo}
              className="absolute top-2 md:top-4 right-2 md:right-4 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-foreground/80 text-background flex items-center justify-center hover:bg-foreground transition-colors"
            >
              <X className="h-4 w-4 md:h-5 md:w-5" />
            </button>

            <button
              onClick={toggleMute}
              className="absolute top-2 md:top-4 left-2 md:left-4 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-foreground/80 text-background flex items-center justify-center hover:bg-foreground transition-colors"
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4 md:h-5 md:w-5" />
              ) : (
                <Volume2 className="h-4 w-4 md:h-5 md:w-5" />
              )}
            </button>

            {selectedVideo && (
              <div
                className={cn(
                  'bg-black flex items-center justify-center',
                  selectedVideo.isVertical ? 'aspect-[9/16] max-h-[80vh]' : 'aspect-video',
                )}
              >
                <video
                  ref={videoRef}
                  src={selectedVideo.videoUrl}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLVideoElement;
                    target.style.display = 'none';
                  }}
                >
                  <p className="text-background text-center p-4">
                    Seu navegador não suporta a reprodução de vídeos.
                  </p>
                </video>
              </div>
            )}

            {selectedVideo && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 md:p-4">
                <h3 className="text-white font-medium text-sm md:text-base line-clamp-1">
                  {selectedVideo.title}
                </h3>
                <p className="text-white/70 text-xs md:text-sm">Por {selectedVideo.customer}</p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};
