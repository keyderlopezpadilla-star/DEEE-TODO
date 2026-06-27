import { create } from 'zustand';

export interface OrderSettings {
  size: 'A4' | 'A5' | 'A3' | 'custom';
  customWidth?: number;
  customHeight?: number;
  material: 'estucado' | 'reciclado' | 'fotografico' | 'dtf' | 'vinilo';
  binding: 'espiral' | 'encolado' | 'grapado' | 'sin_encuadernacion';
  copies: number;
  notes: string;
}

export interface CustomizerState {
  // Canvas state
  backgroundColor: string;
  canvasDataUrl: string | null;
  uploadedFiles: File[];
  
  // Order settings
  orderSettings: OrderSettings;
  
  // Submission state
  sendMethod: 'whatsapp' | 'email';
  isSubmitting: boolean;
  submitSuccess: boolean;
  submitError: string | null;
  
  // Actions
  setBackgroundColor: (color: string) => void;
  setCanvasDataUrl: (url: string | null) => void;
  addUploadedFile: (file: File) => void;
  removeUploadedFile: (index: number) => void;
  setOrderSettings: (settings: Partial<OrderSettings>) => void;
  setSendMethod: (method: 'whatsapp' | 'email') => void;
  setSubmitting: (state: boolean) => void;
  setSubmitSuccess: (state: boolean) => void;
  setSubmitError: (error: string | null) => void;
  reset: () => void;
}

const defaultOrderSettings: OrderSettings = {
  size: 'A4',
  material: 'estucado',
  binding: 'sin_encuadernacion',
  copies: 1,
  notes: '',
};

export const useCustomizerStore = create<CustomizerState>((set) => ({
  backgroundColor: '#ffffff',
  canvasDataUrl: null,
  uploadedFiles: [],
  
  orderSettings: defaultOrderSettings,
  
  sendMethod: 'email',
  isSubmitting: false,
  submitSuccess: false,
  submitError: null,
  
  setBackgroundColor: (color) => set({ backgroundColor: color }),
  setCanvasDataUrl: (url) => set({ canvasDataUrl: url }),
  addUploadedFile: (file) => set((state) => ({ 
    uploadedFiles: [...state.uploadedFiles, file] 
  })),
  removeUploadedFile: (index) => set((state) => ({
    uploadedFiles: state.uploadedFiles.filter((_, i) => i !== index)
  })),
  setOrderSettings: (settings) => set((state) => ({
    orderSettings: { ...state.orderSettings, ...settings }
  })),
  setSendMethod: (method) => set({ sendMethod: method }),
  setSubmitting: (state) => set({ isSubmitting: state }),
  setSubmitSuccess: (state) => set({ submitSuccess: state }),
  setSubmitError: (error) => set({ submitError: error }),
  reset: () => set({
    backgroundColor: '#ffffff',
    canvasDataUrl: null,
    uploadedFiles: [],
    orderSettings: defaultOrderSettings,
    sendMethod: 'email',
    isSubmitting: false,
    submitSuccess: false,
    submitError: null,
  }),
}));
