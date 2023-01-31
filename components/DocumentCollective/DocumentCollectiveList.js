import { getDocumentCollectivesRequest } from "@/services/users.services";
import { useQuery } from "@tanstack/react-query";

function DocumentCollectiveList() {
  const [query, setQuery] = useState({
    lastId: null,
  });

  const { data, isLoading } = useQuery(
    ["document-collectives", query],
    () => getDocumentCollectivesRequest(query),
    {
      enabled: !!query,
    }
  );
  return <div>DocumentCollectiveList</div>;
}

export default DocumentCollectiveList;
