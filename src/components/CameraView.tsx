import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, Zap, CheckCircle, AlertCircle } from 'lucide-react';

interface CameraViewProps {
  onItemsDetected: (items: any[]) => void;
}

export default function CameraView({ onItemsDetected }: CameraViewProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [detectedItems, setDetectedItems] = useState<any[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setHasPermission(true);
    } catch (error) {
      setHasPermission(false);
    }
  };

  const capturePhoto = () => {
    setIsProcessing(true);
    // Simulate AI processing
    setTimeout(() => {
      const mockItems = [
        { name: 'Tomato', confidence: 0.95, quantity: 3 },
        { name: 'Carrot', confidence: 0.88, quantity: 2 },
        { name: 'Lettuce', confidence: 0.92, quantity: 1 },
      ];
      setDetectedItems(mockItems);
      setIsProcessing(false);
    }, 2000);
  };

  const confirmItems = () => {
    onItemsDetected(detectedItems);
    setDetectedItems([]);
  };

  if (hasPermission === false) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-gradient-veggie rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <AlertCircle className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className="font-heading text-xl font-semibold text-charcoal mb-4">
            Camera Permission Needed
          </h2>
          <p className="text-charcoal/70 mb-6 font-body">
            To scan your kitchen items, we need access to your camera. Please allow camera permissions and try again.
          </p>
          <button onClick={startCamera} className="btn-primary">
            Enable Camera
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="btn-secondary mt-3 w-full flex items-center justify-center space-x-2"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Photo Instead</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Camera Viewfinder */}
      <div className="flex-1 relative bg-charcoal/10 rounded-t-3xl overflow-hidden">
        {hasPermission === null ? (
          <div className="flex items-center justify-center h-full">
            <button onClick={startCamera} className="btn-primary">
              <Camera className="w-5 h-5 mr-2" />
              Start Camera
            </button>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            
            {/* Scanning Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 border-4 border-white/50 rounded-lg relative">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-lettuce rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-lettuce rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-lettuce rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-lettuce rounded-br-lg"></div>
                
                {isProcessing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-lettuce/20 flex items-center justify-center"
                  >
                    <div className="text-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-12 h-12 border-4 border-white border-t-lettuce rounded-full mx-auto mb-2"
                      />
                      <p className="text-white font-heading font-semibold">Scanning...</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Instructions */}
            <div className="absolute top-4 left-4 right-4">
              <div className="bg-black/50 backdrop-blur-sm rounded-blob p-3">
                <p className="text-white text-sm font-body text-center">
                  📸 Position your vegetables and fruits in the frame
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Detected Items */}
      {detectedItems.length > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white p-4 rounded-t-3xl shadow-lg"
        >
          <h3 className="font-heading font-semibold text-lg mb-3 flex items-center">
            <CheckCircle className="w-5 h-5 text-lettuce mr-2" />
            Items Detected
          </h3>
          <div className="space-y-2 mb-4">
            {detectedItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-cream/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-veggie rounded-full flex items-center justify-center">
                    <span className="text-white font-heading font-bold text-sm">
                      {item.name[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-heading font-semibold">{item.name}</p>
                    <p className="text-sm text-charcoal/60">
                      {Math.round(item.confidence * 100)}% confidence
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="w-8 h-8 bg-tomato/20 rounded-full flex items-center justify-center">
                    <span className="text-tomato font-bold">-</span>
                  </button>
                  <span className="font-heading font-semibold w-8 text-center">
                    {item.quantity}
                  </span>
                  <button className="w-8 h-8 bg-lettuce/20 rounded-full flex items-center justify-center">
                    <span className="text-lettuce font-bold">+</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button onClick={confirmItems} className="btn-primary w-full">
            Add to Pantry
          </button>
        </motion.div>
      )}

      {/* Capture Button */}
      {hasPermission && detectedItems.length === 0 && (
        <div className="p-6 bg-white">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={capturePhoto}
            disabled={isProcessing}
            className="w-20 h-20 bg-gradient-veggie rounded-full flex items-center justify-center mx-auto shadow-lg disabled:opacity-50"
          >
            {isProcessing ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Zap className="w-8 h-8 text-white" />
              </motion.div>
            ) : (
              <Camera className="w-8 h-8 text-white" />
            )}
          </motion.button>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            capturePhoto(); // Simulate processing uploaded image
          }
        }}
      />
    </div>
  );
}