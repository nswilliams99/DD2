
interface RolloffTownHeadingProps {
  townName: string;
}

const RolloffTownHeading = ({ townName }: RolloffTownHeadingProps) => {
  const getHeading = (town: string) => {
    switch (town) {
      case 'Fort Collins':
        return 'Roll-Off Dumpster Rentals in Fort Collins';
      case 'Greeley':
        return 'Roll-Off Dumpster Rentals in Greeley';
      case 'Berthoud':
        return 'Roll-Off Dumpsters in Berthoud';
      case 'Loveland':
        return 'Roll-Off Dumpster Rentals in Loveland';
      case 'Longmont':
        return 'Roll-Off Dumpster Rentals in Longmont';
      case 'Northern Communities':
        return 'Rural & Mountain Dumpster Rentals';
      case 'Severance':
        return 'Roll-Off Dumpster Rentals in Severance';
      case 'Wellington':
        return 'Roll-Off Dumpster Rentals in Wellington';
      case 'Windsor':
        return 'Roll-Off Dumpster Rentals in Windsor';
      default:
        return `Roll-Off Dumpsters in ${town}`;
    }
  };

  return (
    <h1 id="hero-heading" className="text-3xl lg:text-4xl font-bold leading-tight font-poppins">
      {getHeading(townName)}
    </h1>
  );
};

export default RolloffTownHeading;
