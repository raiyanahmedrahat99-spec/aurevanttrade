import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, Globe } from 'lucide-react';
import { Container } from '@/src/components/ui/Container';
import { Section } from '@/src/components/ui/Section';
import { db } from '@/src/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const contactDetails = [
  { label: 'Corporate Hotline', value: '+880 1712 583 641', category: 'General' },
  { label: 'Dhaka Head Office', value: '+880 2 5831 7642', category: 'Corporate' },
  { label: 'Customer Support', value: '+880 1814 726 593', category: 'Support' },
  { label: 'Media Office', value: '+880 1613 857 294', category: 'Media' },
];

const emailDirectory = [
  { label: 'General Enquiries', value: 'info@aurevantgroup.com' },
  { label: 'Board Secretariat', value: 'board@aurevantgroup.com' },
  { label: 'Press Office', value: 'press@aurevantgroup.com' },
  { label: 'Business Partnerships', value: 'partnerships@aurevantgroup.com' },
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    enquiryType: 'General Enquiry',
    subject: '',
    message: '',
    consent: false,
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) return;
    
    setStatus('submitting');
    try {
      await addDoc(collection(db, 'inquiries'), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        organization: '',
        enquiryType: 'General Enquiry',
        subject: '',
        message: '',
        consent: false,
      });
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      setStatus('error');
    }
  };

  return (
    <div className="pt-24 bg-white">
      <Section spacing="md" className="bg-ivory border-b border-stone-warm">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-end">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-serif">Contact</h1>
              <p className="text-xl font-serif italic text-grey-muted max-w-lg">
                “We welcome thoughtful enquiries, editorial contributions, and opportunities for collaboration.”
              </p>
            </div>
            <div className="flex flex-wrap gap-x-12 gap-y-6 lg:justify-end pb-4">
               {contactDetails.slice(0, 2).map(detail => (
                 <div key={detail.label} className="space-y-1">
                   <p className="text-[10px] uppercase tracking-widest text-grey-muted font-bold">{detail.label}</p>
                   <a href={`tel:${detail.value.replace(/\s/g, '')}`} className="text-xl font-serif hover:text-champagne transition-colors">{detail.value}</a>
                 </div>
               ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-24">
            {/* Form */}
            <div className="space-y-12">
              <h2 className="text-3xl font-serif">Send an Enquiry</h2>
              
              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="p-10 bg-ivory border border-stone-warm text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-champagne text-ivory rounded-full flex items-center justify-center mx-auto mb-6">
                    <Globe size={32} />
                  </div>
                  <h3 className="text-2xl font-serif">Message Received</h3>
                  <p className="text-grey-muted italic font-serif">Your enquiry has been successfully delivered. We will review your message and respond accordingly.</p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-xs font-bold uppercase tracking-widest text-champagne hover:text-obsidian transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-grey-muted">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-4 bg-ivory border border-stone-warm focus:border-obsidian outline-none transition-colors text-base sm:text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-grey-muted">Business Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-4 bg-ivory border border-stone-warm focus:border-obsidian outline-none transition-colors text-base sm:text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-grey-muted">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+880 ..."
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-4 bg-ivory border border-stone-warm focus:border-obsidian outline-none transition-colors text-base sm:text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-grey-muted">Organisation</label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={e => setFormData({...formData, organization: e.target.value})}
                      className="w-full px-4 py-4 bg-ivory border border-stone-warm focus:border-obsidian outline-none transition-colors text-base sm:text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-grey-muted">Enquiry Type *</label>
                    <select
                      value={formData.enquiryType}
                      onChange={e => setFormData({...formData, enquiryType: e.target.value})}
                      className="w-full px-4 py-4 bg-ivory border border-stone-warm focus:border-obsidian outline-none transition-colors text-sm appearance-none"
                    >
                      <option>General Enquiry</option>
                      <option>Business Partnership</option>
                      <option>Editorial Submission</option>
                      <option>Media Enquiry</option>
                      <option>Careers</option>
                      <option>Technical Support</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-grey-muted">Subject *</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={e => setFormData({...formData, subject: e.target.value})}
                      className="w-full px-4 py-4 bg-ivory border border-stone-warm focus:border-obsidian outline-none transition-colors text-sm"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-grey-muted">Message *</label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-4 bg-ivory border border-stone-warm focus:border-obsidian outline-none transition-colors text-sm resize-none"
                    ></textarea>
                  </div>
                  <div className="md:col-span-2 flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="consent"
                      required
                      checked={formData.consent}
                      onChange={e => setFormData({...formData, consent: e.target.checked})}
                      className="mt-1"
                    />
                    <label htmlFor="consent" className="text-[10px] uppercase tracking-widest text-grey-muted leading-relaxed">
                      I consent to the collection and processing of my data in accordance with the AUREVANT GROUP Privacy Policy.
                    </label>
                  </div>
                  <div className="md:col-span-2 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full md:w-auto px-12 py-5 bg-obsidian text-ivory text-xs font-semibold uppercase tracking-widest hover:bg-champagne hover:text-obsidian transition-colors disabled:opacity-50 shadow-md cursor-pointer"
                    >
                      {status === 'submitting' ? 'Sending...' : 'Send Enquiry'}
                    </motion.button>
                    {status === 'error' && (
                      <p className="mt-4 text-xs text-red-500 uppercase tracking-widest">An error occurred. Please try again or contact us via email.</p>
                    )}
                  </div>
                </form>
              )}
            </div>

            {/* Sidebar Details */}
            <div className="space-y-16">
              <div className="space-y-8">
                <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-champagne">Corporate Directory</h3>
                <div className="space-y-6">
                   {emailDirectory.map(email => (
                     <div key={email.label} className="space-y-1">
                       <p className="text-[10px] uppercase tracking-widest text-grey-muted">{email.label}</p>
                       <a href={`mailto:${email.value}`} className="text-sm font-medium hover:text-champagne transition-colors">{email.value}</a>
                     </div>
                   ))}
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-champagne">Technical Standards</h3>
                <div className="space-y-6">
                   <div className="flex items-start gap-4">
                     <div className="w-10 h-10 border border-stone-warm flex items-center justify-center shrink-0">
                       <Phone size={16} />
                     </div>
                     <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-widest text-grey-muted">Technical Support</p>
                        <p className="text-sm font-medium">+880 1916 438 275</p>
                     </div>
                   </div>
                   <div className="flex items-start gap-4">
                     <div className="w-10 h-10 border border-stone-warm flex items-center justify-center shrink-0">
                       <Mail size={16} />
                     </div>
                     <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-widest text-grey-muted">Support Desk</p>
                        <p className="text-sm font-medium">helpdesk@aurevantgroup.com</p>
                     </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
