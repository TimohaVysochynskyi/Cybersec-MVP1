import css from "./Simulation.module.css";
import Layout from "./components/Layout/Layout";
import EmailsList from "./components/inbox/EmailsList/EmailsList";
import NavigationBar from "./components/inbox/NavigationBar/NavigationBar";

export default function SimulationPage() {
  return (
    <>
      <Layout>
        <div className={css.container}>
          <NavigationBar />
          <div className={css.content}>
            <EmailsList />
          </div>
        </div>
      </Layout>
    </>
  );
}
