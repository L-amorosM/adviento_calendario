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
  
  // Calculate days until December 24
  const getDaysUntilChristmas = () => {
    const now = new Date();
    const christmas = new Date(now.getFullYear(), 11, 24); // December 24
    
    // If we're past Dec 24 this year, calculate for next year
    if (now > christmas) {
      christmas.setFullYear(christmas.getFullYear() + 1);
    }
    
    const diffTime = christmas.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  const daysUntilChristmas = getDaysUntilChristmas();
  
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
      
      {/* Background pattern */}
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, hsl(var(--advent-gold)) 2%, transparent 0%)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Sparkles effect - more visible and constant */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-0"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              background: i % 3 === 0 
                ? 'hsl(var(--advent-gold))' 
                : i % 3 === 1 
                ? 'hsl(var(--advent-gold-light))' 
                : 'hsl(var(--advent-wine) / 0.6)',
              filter: 'blur(1.5px)',
              boxShadow: '0 0 8px currentColor',
            }}
            animate={{
              opacity: [0, 0.9, 0],
              scale: [0.3, 2, 0.3],
              y: [0, -40, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 1.5,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12 lg:py-16">
        {/* Header */}
        <motion.div 
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Calendario de Adviento
          </h1>
          
          {/* Days Until Christmas Counter */}
          <motion.div 
            className="max-w-md mx-auto mb-6 px-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-br from-advent-gold-light/20 to-advent-wine/10 rounded-full border border-advent-gold/30">
              <span className="font-playfair text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-advent-wine to-advent-gold">
                {daysUntilChristmas}
              </span>
              <span className="font-lato text-sm md:text-base text-muted-foreground">
                {daysUntilChristmas === 1 ? 'día hasta el 24' : 'días hasta el 24'}
              </span>
            </div>
          </motion.div>
          
          {/* Welcome Message */}
          <motion.div 
            className="max-w-xl mx-auto mb-8 px-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="font-lato text-base md:text-lg leading-relaxed text-muted-foreground/90">
              Este calendario es para ti.
              <br />
              Cada día es una pequeña sorpresa, un detalle y un recordatorio
              <br className="hidden md:block" />
              de lo mucho que te quiero.
              <br />
              Ábrelo con calma y disfruta de cada momento.
            </p>
          </motion.div>
        </motion.div>

        {/* Calendar Grid - Days 1-24 */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6 max-w-6xl mx-auto px-2 sm:px-0">
          {adventMessages.filter(item => item.day <= 24).map((item, index) => {
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
                    w-full h-full relative rounded-xl md:rounded-2xl overflow-hidden
                    transition-all duration-300 min-h-[100px] sm:min-h-[120px]
                    ${isUnlocked 
                      ? 'cursor-pointer hover:scale-105 hover:shadow-xl active:scale-95' 
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
                      font-playfair text-4xl sm:text-5xl md:text-6xl font-bold
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

        {/* Special Day 25 - Centered and Larger */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.6, 
            delay: 1.2,
            ease: "easeOut"
          }}
          className="mt-8 md:mt-12 max-w-md mx-auto px-2 sm:px-0"
        >
          {(() => {
            const day25 = adventMessages.find(item => item.day === 25);
            if (!day25) return null;
            
            const isUnlocked = canOpenDay(25);
            const isToday = currentMonth === 11 && currentDay === 25;

            return (
              <motion.button
                onClick={() => handleDayClick(25)}
                disabled={!isUnlocked}
                className={`
                  w-full relative rounded-3xl overflow-hidden
                  transition-all duration-300 min-h-[200px] md:min-h-[240px]
                  ${isUnlocked 
                    ? 'cursor-pointer hover:scale-105 hover:shadow-2xl active:scale-95' 
                    : 'cursor-not-allowed opacity-40'
                  }
                  ${isToday ? 'animate-glow' : ''}
                `}
                whileHover={isUnlocked ? { scale: 1.05 } : {}}
                whileTap={isUnlocked ? { scale: 0.95 } : {}}
              >
                {/* Special Background with Golden Border */}
                <div className={`
                  absolute inset-0 
                  ${isUnlocked 
                    ? 'bg-gradient-to-br from-advent-cream via-advent-gold-light/40 to-advent-wine/30'
                    : 'bg-muted/50'
                  }
                `} />
                
                {/* Golden Border */}
                {isUnlocked && (
                  <div className="absolute inset-0 border-4 border-advent-gold/50 rounded-3xl" 
                    style={{
                      boxShadow: '0 0 30px rgba(212, 175, 55, 0.4), inset 0 0 20px rgba(212, 175, 55, 0.1)'
                    }}
                  />
                )}
                
                {/* Locked overlay */}
                {!isUnlocked && (
                  <div className="absolute inset-0 bg-foreground/5 backdrop-blur-sm" />
                )}

                {/* Day Number */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`
                    font-playfair text-7xl md:text-8xl lg:text-9xl font-bold
                    ${isUnlocked 
                      ? 'text-transparent bg-clip-text bg-gradient-to-br from-advent-wine to-advent-gold' 
                      : 'text-muted-foreground'
                    }
                  `}>
                    {day25.day}
                  </span>
                </div>

                {/* Decorative elements for unlocked day */}
                {isUnlocked && (
                  <>
                    <div className="absolute top-4 right-4 w-5 h-5 bg-advent-gold rounded-full shadow-lg" 
                      style={{ boxShadow: '0 0 15px rgba(212, 175, 55, 0.6)' }}
                    />
                    <div className="absolute bottom-4 left-4 w-4 h-4 bg-advent-wine/70 rounded-full shadow-lg" />
                    <div className="absolute top-4 left-4 w-3 h-3 bg-advent-gold-light rounded-full shadow-lg" />
                    <div className="absolute bottom-4 right-4 w-4 h-4 bg-advent-wine/60 rounded-full shadow-lg" />
                  </>
                )}

                {/* Today indicator */}
                {isToday && (
                  <motion.div 
                    className="absolute -top-2 -right-2 w-8 h-8 bg-secondary rounded-full"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}

                {/* Hover shimmer effect */}
                {isUnlocked && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-advent-gold-light/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                )}
              </motion.button>
            );
          })()}
        </motion.div>
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
            {/* Confetti effect for Day 25 */}
            {selectedMessage.day === 25 && (
              <div className="fixed inset-0 pointer-events-none">
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: '-5%',
                      width: `${3 + Math.random() * 5}px`,
                      height: `${3 + Math.random() * 5}px`,
                      background: i % 4 === 0 
                        ? 'hsl(var(--advent-gold))' 
                        : i % 4 === 1 
                        ? 'hsl(var(--advent-wine))' 
                        : i % 4 === 2
                        ? 'hsl(var(--advent-gold-light))'
                        : 'hsl(var(--advent-cream))',
                    }}
                    animate={{
                      y: ['0vh', '110vh'],
                      x: [0, (Math.random() - 0.5) * 200],
                      rotate: [0, Math.random() * 360],
                      opacity: [1, 0.8, 0],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                      ease: "linear"
                    }}
                  />
                ))}
              </div>
            )}

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
                  <motion.h2 
                    className="font-playfair text-3xl md:text-4xl font-bold text-foreground mb-4"
                    initial={selectedMessage.day === 25 ? { opacity: 0, y: -10 } : {}}
                    animate={selectedMessage.day === 25 ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 }}
                  >
                    {selectedMessage.title}
                  </motion.h2>
                  
                  <motion.p 
                    className={`font-lato text-muted-foreground leading-relaxed mb-6 ${
                      selectedMessage.day === 25 ? 'text-base md:text-lg' : 'text-lg md:text-xl'
                    }`}
                    initial={selectedMessage.day === 25 ? { opacity: 0, y: 10 } : {}}
                    animate={selectedMessage.day === 25 ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 }}
                  >
                    {selectedMessage.message}
                  </motion.p>

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
