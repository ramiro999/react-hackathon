import PropTypes from 'prop-types';

const CardComponent = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full md:max-w-md p-5 bg-bones rounded shadow-lg">
        {children}
      </div>
    </div>
  );
};

CardComponent.propTypes = {
  children: PropTypes.node,
};

export default CardComponent;


