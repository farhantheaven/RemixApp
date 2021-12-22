import { ActionFunction, Link, MetaFunction, redirect } from 'remix';
import styled from 'styled-components';

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const meta: MetaFunction = () => {
  return {
    title: 'Seo on index page',
    description: 'seo can make money.'
  }
}

export default function IndexRoute() {
    return <StyledDiv>
        <div>Generate Weekly Report</div>
        <div>
          <Link to="/reports">
            <button type="submit" className="button">
              Get Report
            </button>
          </Link>
        </div>
    </StyledDiv>;
  }