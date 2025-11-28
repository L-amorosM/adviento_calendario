import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { adventMessages } from "@/data/adventMessages";
import { Button } from "@/components/ui/button";

const AdventCalendar = () => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  
  // Get current date (for testing, you can hardcode a date)
  const today = new Date();
  const currentDay = 25;
  const currentMonth = 11; // 0 = January, 11 = December
  
  // Check if a day can be opened (only in December and if date has arrived)
  const canOpenDay = (day: number) => {
    return currentMonth === 11 && currentDay >= day;
  };

  const handleDayClick = (day: number) => {
    if (canOpenDay(day)) {
      setSelectedDay(day);
    }
  };

  const selectedMessage = selectedDay 
    ? adventMessages.find(msg => msg.day === selectedDay)
    : null;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with elegant gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-advent-cream via-advent-gold-light/20 to-advent-wine/10" />
      
      {/* Optional: Add background pattern */}
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, hsl(var(--advent-gold)) 2%, transparent 0%)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-16">
        {/* Header */}
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4">
            Calendario de Adviento
          </h1>
          <p className="font-lato text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            24 días de amor, sorpresas y momentos especiales
          </p>
        </motion.div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 max-w-6xl mx-auto">
          {adventMessages.map((item, index) => {
            const isUnlocked = canOpenDay(item.day);
            const isToday = currentMonth === 11 && currentDay === item.day;

            return (
              <motion.div
                key={item.day}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.05,
                  ease: "easeOut"
                }}
                className="aspect-square"
              >
                <motion.button
                  onClick={() => handleDayClick(item.day)}
                  disabled={!isUnlocked}
                  className={`
                    w-full h-full relative rounded-2xl overflow-hidden
                    transition-all duration-300
                    ${isUnlocked 
                      ? 'cursor-pointer hover:scale-105 hover:shadow-xl' 
                      : 'cursor-not-allowed opacity-40'
                    }
                    ${isToday ? 'animate-glow' : ''}
                  `}
                  whileHover={isUnlocked ? { scale: 1.05 } : {}}
                  whileTap={isUnlocked ? { scale: 0.95 } : {}}
                >
                  {/* Card Background */}
                  <div className={`
                    absolute inset-0 
                    ${isUnlocked 
                      ? 'bg-gradient-to-br from-card via-advent-gold-light/30 to-advent-wine/20'
                      : 'bg-muted/50'
                    }
                  `} />
                  
                  {/* Locked overlay */}
                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-foreground/5 backdrop-blur-sm" />
                  )}

                  {/* Day Number */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`
                      font-playfair text-5xl md:text-6xl font-bold
                      ${isUnlocked 
                        ? 'text-transparent bg-clip-text bg-gradient-to-br from-advent-wine to-advent-gold' 
                        : 'text-muted-foreground'
                      }
                    `}>
                      {item.day}
                    </span>
                  </div>

                  {/* Decorative elements for unlocked days */}
                  {isUnlocked && (
                    <>
                      <div className="absolute top-2 right-2 w-3 h-3 bg-advent-gold rounded-full" />
                      <div className="absolute bottom-2 left-2 w-2 h-2 bg-advent-wine/60 rounded-full" />
                    </>
                  )}

                  {/* Today indicator */}
                  {isToday && (
                    <motion.div 
                      className="absolute -top-1 -right-1 w-6 h-6 bg-secondary rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal for selected day */}
      <AnimatePresence>
        {selectedMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/30 backdrop-blur-sm"
            onClick={() => setSelectedDay(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateY: -90 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateY: 90 }}
              transition={{ 
                type: "spring", 
                damping: 25,
                stiffness: 200 
              }}
              className="relative max-w-2xl w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-card rounded-3xl shadow-2xl overflow-hidden">
                {/* Close button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 z-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                  onClick={() => setSelectedDay(null)}
                >
                  <X className="w-5 h-5" />
                </Button>

                {/* Image */}
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <img 
                    src={selectedMessage.image} 
                    alt={`Día ${selectedMessage.day}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                  
                  {/* Day number badge */}
                  <div className="absolute top-6 left-6 w-16 h-16 bg-gradient-to-br from-advent-gold to-advent-wine rounded-full flex items-center justify-center shadow-lg">
                    <span className="font-playfair text-2xl font-bold text-white">
                      {selectedMessage.day}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-10">
                  <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-4">
                    {selectedMessage.title}
                  </h2>
                  
                  <p className="font-lato text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
                    {selectedMessage.message}
                  </p>

                  {selectedMessage.gift && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-advent-gold-light/20 to-advent-wine/10 border border-advent-gold/20"
                    >
                      <p className="font-playfair text-sm uppercase tracking-wider text-advent-wine mb-2">
                        Regalo Especial
                      </p>
                      <p className="font-lato text-base text-foreground/80 italic">
                        {selectedMessage.gift}
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdventCalendar;
