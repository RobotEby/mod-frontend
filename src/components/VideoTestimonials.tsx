import { useState, useRef, useCallback, useEffect } from 'react';
import { Play, X, Volume2, VolumeX } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

const videos = [
  {
    id: '1',
    videoUrl: '/3773487-hd_1920_1080_30fps.mp4',
    thumbnail: '/3773487-hd_1920_1080_30fps.webp',
    title: 'Tour pelo Projeto - Sala de Estar Completa',
    duration: '0:06',
    customer: 'Luana Martins',
  },
  {
    id: '2',
    videoUrl: '/15887133-uhd_3840_2160_30fps.mp4',
    thumbnail: '/15887133-uhd_3840_2160_30fps.webp',
    title: 'Unboxing do Quarto dos Sonhos',
    duration: '0:19',
    customer: 'João Pedro',
  },
  {
    id: '3',
    videoUrl: '/6998652-hd_1080_1920_25fps.mp4',
    thumbnail: '/6998652-hd_1080_1920_25fps.webp',
    title: 'Escritório Home Office Premium',
    duration: '0:35',
    customer: 'Gabriel Souza',
  },
  {
    id: '4',
    videoUrl: '/3773486-hd_1920_1080_30fps.mp4',
    thumbnail: '/3773486-hd_1920_1080_30fps.webp',
    title: 'Sala de Jantar para 8 Pessoas',
    duration: '0:10',
    customer: 'Fernando Costa',
  },
  {
    id: '5',
    videoUrl: '/3555398-hd_1920_1080_30fps.mp4',
    thumbnail: '/3555398-hd_1920_1080_30fps.webp',
    title: 'Varanda Gourmet Completa',
    duration: '0:40',
    customer: 'Juliana Lima',
  },
];

export const VideoTestimonials = () => {
  const [selectedVideo, setSelectedVideo] = useState<(typeof videos)[0] | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="py-6 md:py-16">
      <div className="container px-4">
        <div className="text-center mb-4 md:mb-10">
          <h2 className="text-xl md:text-3xl lg:text-4xl font-roboto-bold mb-1 md:mb-2">
            Vídeos de Clientes
          </h2>
          <p className="text-xs md:text-base text-muted-foreground">
            Veja as experiências reais de quem transformou seus ambientes
          </p>
        </div>

        <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          {videos.map((video) => (
            <button
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className="flex-shrink-0 w-[120px] sm:w-48 md:w-56 lg:w-64 text-left group touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
              aria-label={`${video.title} por ${video.customer}`}
            >
              <div className="relative overflow-hidden rounded-lg aspect-[9/16] mb-1.5 md:mb-2 bg-muted">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-foreground/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/90 flex items-center justify-center">
                    <Play className="h-4 w-4 md:h-5 md:w-5 text-foreground ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-1.5 right-1.5 bg-foreground/70 text-background text-[10px] md:text-xs px-1.5 py-0.5 rounded">
                  {video.duration}
                </span>
              </div>
              <p className="text-xs md:text-sm font-roboto-medium line-clamp-2 leading-tight">
                {video.title}
              </p>
              <p className="text-[10px] md:text-xs text-muted-foreground">Por {video.customer}</p>
            </button>
          ))}
        </div>

        <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
          <DialogContent className="max-w-4xl p-0 overflow-hidden">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-2 right-2 z-20 w-8 h-8 rounded-full bg-foreground/50 text-background flex items-center justify-center"
            >
              <X className="h-4 w-4" />
            </button>
            <button
              onClick={toggleMute}
              className="absolute top-2 right-12 z-20 w-8 h-8 rounded-full bg-foreground/50 text-background flex items-center justify-center"
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
            {selectedVideo && (
              <div className="relative bg-black">
                <video
                  ref={videoRef}
                  src={selectedVideo.videoUrl}
                  autoPlay
                  controls
                  className="w-full max-h-[80vh]"
                >
                  Seu navegador não suporta a reprodução de vídeos.
                </video>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-4">
                  <p className="text-background font-roboto-semibold text-sm md:text-base">
                    {selectedVideo.title}
                  </p>
                  <p className="text-background/70 text-xs">Por {selectedVideo.customer}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};
