import { useState } from 'react';

const FAQSection = () => {
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaqIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const faqs = [
    {
      pregunta: "¿Cómo almacenar reactivos químicos correctamente?",
      respuesta: "Los reactivos deben guardarse en un lugar fresco, seco y bien ventilado, lejos de luz solar directa. Organícelos por compatibilidad química y mantenga los recipientes bien cerrados.",
      tags: ["almacenamiento", "seguridad"]
    },
    {
      pregunta: "¿Qué hacer en caso de derrame?",
      respuesta: "1. Alertar a las personas cercanas\n2. Usar equipo de protección adecuado\n3. Contener el derrame con materiales absorbentes\n4. Seguir el protocolo de seguridad del laboratorio\n5. Reportar el incidente",
      tags: ["emergencia", "protocolo"]
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-green-600 to-green-800 px-6 py-4">
        <h2 className="text-xl font-bold text-white flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Preguntas Frecuentes
        </h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem 
              key={`faq-${index}`} 
              faq={faq} 
              index={index}
              isActive={activeFaqIndex === index}
              onToggle={toggleFaq}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const FAQItem = ({ faq, index, isActive, onToggle }) => (
  <div className="border border-gray-200 rounded-lg overflow-hidden">
    <button
      className={`w-full flex justify-between items-center p-4 text-left ${isActive ? 'bg-green-50' : 'hover:bg-gray-50'} transition-colors`}
      onClick={() => onToggle(index)}
    >
      <h3 className="font-medium text-gray-900 flex-1">{faq.pregunta}</h3>
      <svg
        className={`w-5 h-5 ml-4 flex-shrink-0 transform transition-transform duration-200 ${isActive ? 'rotate-180 text-green-600' : 'text-gray-400'}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    {isActive && (
      <div className="px-4 pb-4">
        <div className="flex items-start">
          <div className="bg-green-100 p-2 rounded-lg mr-3 mt-1">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-gray-700 whitespace-pre-line">{faq.respuesta}</p>
            {faq.tags && faq.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {faq.tags.map((tag) => (
                  <span key={`tag-${tag}`} className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-600">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )}
  </div>
);

export default FAQSection;