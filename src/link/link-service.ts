import { Link } from "./link";
import { getLink } from "./link-functions";

export interface ILinkService {
  loading: boolean;
  link: Link;
}

export function useLinkService(): ILinkService {
  const [state, setState] = useState({
    loading: true,
    link: { url: "", title: "" },
  });

  useEffect(() => {
    (async () => {
      const link = await getLink();
      setState({ loading: false, link });
    })();
  }, []);

  return { loading: state.loading, link: state.link };
}
