class SoundManager {
  constructor() {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  // Play a simple ascending beep for scanning
  playScanSound() {
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    
    const osc = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, this.audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 0.3);
    
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.05);
    gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.3);
    
    osc.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    osc.start();
    osc.stop(this.audioContext.currentTime + 0.3);
  }

  // Play a pleasant chime for Safe
  playSafeSound() {
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }

    const osc1 = this.audioContext.createOscillator();
    const osc2 = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    osc1.type = 'sine';
    osc2.type = 'triangle';
    
    // Major chord (C5 and E5)
    osc1.frequency.setValueAtTime(523.25, this.audioContext.currentTime);
    osc2.frequency.setValueAtTime(659.25, this.audioContext.currentTime);

    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.15, this.audioContext.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 1.0);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    osc1.start();
    osc2.start();
    osc1.stop(this.audioContext.currentTime + 1.0);
    osc2.stop(this.audioContext.currentTime + 1.0);
  }

  // Play a buzzer for Phishing
  playAlertSound() {
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }

    const osc = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, this.audioContext.currentTime);
    osc.frequency.setValueAtTime(120, this.audioContext.currentTime + 0.2);

    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.2, this.audioContext.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);

    osc.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    osc.start();
    osc.stop(this.audioContext.currentTime + 0.5);
  }

  // Play a subtle high-tech tick for hovering
  playHoverSound() {
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    const osc = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, this.audioContext.currentTime + 0.05);
    
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.02, this.audioContext.currentTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.05);
    
    osc.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    osc.start();
    osc.stop(this.audioContext.currentTime + 0.05);
  }

  // Play a crisp click for buttons
  playClickSound() {
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    const osc = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(400, this.audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, this.audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.05, this.audioContext.currentTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.1);
    
    osc.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    osc.start();
    osc.stop(this.audioContext.currentTime + 0.1);
  }

  // Play a system boot sound for page load animation
  playBootSound() {
    if (this.audioContext.state === 'suspended') {
      // Browsers often block audio before user interaction, but we try anyway
      this.audioContext.resume().catch(() => {});
    }
    try {
      const osc = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(100, this.audioContext.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, this.audioContext.currentTime + 0.8);
      
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.4);
      gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.8);
      
      osc.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      osc.start();
      osc.stop(this.audioContext.currentTime + 0.8);
    } catch(e) {
      console.warn("AudioContext not ready for boot sound", e);
    }
  }
}

// Export a singleton instance
const soundManager = new SoundManager();
export default soundManager;
