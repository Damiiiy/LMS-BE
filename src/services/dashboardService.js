import User from '../models/User.js';
import Track from '../models/Track.js';
import Cohort from '../models/Cohort.js';

class DashboardService {
  async getDashboardData(userId) {
    const user = await User.findById(userId).select('-password').populate('trackId');
    if (!user) {
      throw new Error('User not found');
    }

    let dashboardData = {
      user: {
        fullName: user.fullName,
        email: user.email,
        nickname: user.nickname,
        phoneNumber: user.phoneNumber,
      },
      track: null,
      cohortProgress: null,
      recordings: null
    };

    if (user.trackId) {
      // trackId is populated, so it's the track document
      const track = user.trackId;
      dashboardData.track = {
        id: track._id,
        name: track.name,
        description: track.description
      };
      
      if (track.youtubePlaylistUrl) {
        dashboardData.recordings = {
          playlistUrl: track.youtubePlaylistUrl
        };
      }

      // Calculate cohort progress
      if (track.cohortId) {
        const cohort = await Cohort.findById(track.cohortId);
        if (cohort) {
          const now = new Date();
          const startDate = new Date(cohort.startDate);
          
          let currentWeek = 0;
          if (now >= startDate) {
             const diffTime = Math.abs(now - startDate);
             const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
             currentWeek = Math.floor(diffDays / 7) + 1;
          }
          
          // Cap at total weeks
          if (currentWeek > cohort.totalWeeks) {
            currentWeek = cohort.totalWeeks;
          }

          dashboardData.cohortProgress = {
            currentWeek,
            totalWeeks: cohort.totalWeeks,
            cohortName: cohort.name
          };
        }
      }
    }

    return dashboardData;
  }
}

export default new DashboardService();
