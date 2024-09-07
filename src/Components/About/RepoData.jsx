import React, { useEffect, useState } from 'react';
import { FaCalendarAlt, FaCodeBranch, FaGithub, FaStar, FaCode } from 'react-icons/fa';
import Skills from './Skills'
const RepoData = () => {
  const [repoData, setRepoData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/AmanSuryavanshi-1/TextWise-TextUtilityAPP');
        const data = await response.json();
        setRepoData(data);
      } catch (error) {
        console.error('Error fetching repo data:', error);
      }
    };
    fetchData();
  }, []);

  if (!repoData) {
    return (
      <div className="p-8 mt-8 text-center bg-white rounded-lg shadow-custom">
        <p className="text-lg font-semibold text-bg">Loading repository data...</p>
      </div>
    );
  }

  return (
    <>
         <div className="mt-12">
            <Skills />
        </div>
        
    <div className="p-8 mt-8 bg-white border-2 border-bg rounded-xl shadow-custom">
      <h2 className="mb-6 font-serif text-3xl font-bold text-center text-bg">Featured Repository: TextWise</h2>
      <div className="space-y-5">
        <p className="text-lg text-primaryVariant"><strong>Description:</strong> {repoData.description}</p>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <FaCode className="mr-2 text-bgVariant" />
            <span className="font-semibold text-primaryVariant">Language: </span>
            <span className="ml-1 text-bg">{repoData.language}</span>
          </div>
          <div className="flex items-center">
            <FaStar className="mr-2 text-bgVariant" />
            <span className="font-semibold text-primaryVariant">Stars: </span>
            <span className="ml-1 text-bg">{repoData.stargazers_count}</span>
          </div>
          <div className="flex items-center">
            <FaCodeBranch className="mr-2 text-bgVariant" />
            <span className="font-semibold text-primaryVariant">Forks: </span>
            <span className="ml-1 text-bg">{repoData.forks_count}</span>
          </div>
          <div className="flex items-center">
            <FaCalendarAlt className="mr-2 text-bgVariant" />
            <span className="font-semibold text-primaryVariant">Last Updated: </span>
            <span className="ml-1 text-bg">{new Date(repoData.updated_at).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <a
          href={repoData.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 font-semibold text-white transition-all duration-300 rounded-3xl bg-bg hover:bg-bgVariant"
        >
          <FaGithub className="mr-2" />
          View Repository
        </a>
      </div>
    </div>
    </>
  );
};

export default RepoData;