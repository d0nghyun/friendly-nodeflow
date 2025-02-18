
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // 현재 선택된 조직의 ID를 사용하여 해당 조직의 상세 페이지로 리다이렉트
    // OrganizationSelector의 기본값인 'qore'를 사용
    navigate('/organization/qore');
  }, [navigate]);

  return null;
};

export default Index;
