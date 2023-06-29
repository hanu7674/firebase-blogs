import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
export const recaptcha_v3_siteKey = `6LdiuislAAAAAGH-T_Vdv92XGpjqwdb9U96P-6tp`
export const recaptcha_v3_secretKey = `6LdiuislAAAAAK0y8tGcRsDBaRl4tpWutT3okOS_`
export const recaptcha_v2_siteKey = `6LfpvyslAAAAAGcauvS2wyR8-5dvihgVnXpIWItS`
export const recaptcha_v2_secretKey = `6LfpvyslAAAAANF_bkfEJa722eiDb8UinHrH_mSA`;
export const env = "production ";
export const BreadCrumb = ({ items }) => {
    const lastIndex = items.length - 1;
  
    return (
      <div className="m-2">
        <Breadcrumb>
        {items.map((item, index) => {
            return (
                <Breadcrumb.Item active={index === lastIndex}>
                  <Link to={item.link}>{item.name}
                  </Link>
                
                </Breadcrumb.Item>
            );
          })}
      
        </Breadcrumb>
      </div>
    );
  };


