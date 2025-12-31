

const SectionWrapper = ({ title, children }) => (
  <div className="bg-white border border-gray-200 rounded-lg">
    <div className="bg-gray-50 px-4 py-3 border-b">
      <h4 className="text-lg font-semibold text-gray-900">
        {title}
      </h4>
    </div>
    <div className="p-4">
      {children}
    </div>
  </div>
);

export default SectionWrapper;