import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        name: "Loading...",
        location: "Loading...",
        avatar_url: "",
        bio: "",
      },
    };
  }

  async componentDidMount() {
    try {
      const data = await fetch("https://api.github.com/users/akshaymarch7");
      const json = await data.json();
      this.setState({
        userInfo: json,
      });
    } catch (error) {
      console.error("Failed to fetch user data");
    }
  }

  render() {
    const { name, location, avatar_url, bio, public_repos, followers } = this.state.userInfo;
    
    return (
      <div className="flex flex-col items-center">
        {avatar_url && (
          <img 
            src={avatar_url} 
            alt={name}
            className="w-32 h-32 rounded-full border-4 border-primary-100 mb-4"
          />
        )}
        <h3 className="text-xl font-bold text-dark-900 mb-1">{name}</h3>
        <p className="text-dark-600 dark:text-dark-300 mb-3">{location}</p>
        {bio && <p className="text-dark-700 dark:text-dark-200 text-center mb-4 max-w-md">{bio}</p>}
        
        <div className="flex gap-6 text-center">
          {public_repos !== undefined && (
            <div>
              <div className="font-bold text-dark-900">{public_repos}</div>
              <div className="text-sm text-dark-600">Repositories</div>
            </div>
          )}
          {followers !== undefined && (
            <div>
              <div className="font-bold text-dark-900">{followers}</div>
              <div className="text-sm text-dark-600">Followers</div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default UserClass;
