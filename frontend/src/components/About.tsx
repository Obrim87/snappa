const About = () => {
  return (
    <div className='bg-primary h-screen'>
      <div className='text-left max-w-6xl m-auto bg-primary p-10 text-primaryText'>
        <h1 className='text-5xl font-sans text-center'>What is Snappa?</h1>
        <h2 className='text-2xl font-bold pb-3 pt-3'>Equipment</h2>
        <ul className='list-disc list-inside'>
          <li>Table</li>
          <li>Dice</li>
          <li>Beer</li>
        </ul>
        <h2 className='text-2xl font-bold pb-3 pt-3'>Setup</h2>
        <p>
          Set up a string across the middle of the table at eye height (similar
          to how a volleyball net would be, but shorter). Place four glasses
          filled with beers at each corner. Players sit behind the glasses, with
          team A on one end of the table with Team B on the other.
        </p>
        <h2 className='text-2xl font-bold pb-3 pt-3'>Rules</h2>
        <p className='pb-3'>
          In the Snappa drinking game, teams throw the dice over (above) the
          string that&apos;s perpendicular to the table, attempting to make the
          dice into one of the opposing team&apos;s glasses.{' '}
        </p>
        <ul className='list-disc list-inside'>
          <li>
            2 Points: For &quot;sinking&quot; into one of the other team&apos;s
            glasses
          </li>
          <li>
            1 Point: If the dice hits the table or glass and then hits the
            ground
          </li>
          <li>
            1 Point: If the dice stays on the table but ends up showing a five
          </li>
        </ul>
        <p className='pb-3 pt-3'>
          The opposing team can catch the dice after it hits something, but they
          can only catch it with one hand (not using two hands or their bodies),
          and they can&apos;t take it off of the table. The winner of the game
          is whoever gets to 7 points first. For every point scored against you,
          you must drink 1/3 of your beer. If they make your cup, finish your
          beer. Then roll the dice (some chose to spit it out), and if it lands
          on a five, shotgun/chug an additional beer!
        </p>
      </div>
    </div>
  );
};

export default About;
