import { useSelector, connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function RedirectComponent() {  
    const navigate = useNavigate();
  const location = useSelector(state => state.redirect.location);
  const state = useSelector(state => state.redirect.state)
  return navigate(location, {replace: true, state: state});
}
const mapStateToProps = state => ({
   location:  state.redirect.location,
   state: state.redirect.state
  });

export default connect(mapStateToProps)(RedirectComponent);